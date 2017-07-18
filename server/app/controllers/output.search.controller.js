import Activity from '../models/activity';
import Subject from '../models/subject';
var ObjectId = require('mongoose').Types.ObjectId;



export function getOutputs(req, res) {
  let q = req.query.q;
  let q_regex = '(' + q.trim().replace(/\s+/g,'|') + ')';
  let pattern = new RegExp(q_regex, 'i');

  let longEnoughTerms = q
    .trim()
    .split(' ')
    .reduce((acc, v) => (acc && v.length >= 3), true);

  if (!longEnoughTerms) {
    return res.json({ outputs: [] });
  }

  Subject.find({
    $or: [
      {$text: {$search: q}},
      {'name': pattern},
      {'surname': pattern},
      {'birthdate': pattern},
    ]
  })
  .exec()
  .then(subjects => {
    return subjects.map(s => ObjectId(s.id)); // wrapping into ObjectId is necessary
  })
  .then(subjectIds => {

    return Activity
    .aggregate([
      // text search in activities
      { $match: { $or: [
          {$text: {$search: q}},
          {'description': pattern},
          {'outputs.name': pattern},
          {'outputs.uri': pattern},
          {'subjects.id': {$in: subjectIds}},
        ]}
      },
      // order by full text search score; it seems that sub-ordering by number
      // of $or hits in partial text search is already performed
      { $addFields: { score: { $meta: "textScore" } } },
      // search back for linked activities (input-output)
      { "$graphLookup": {
          "from": "activities",
          "startWith": "$other_resources.id",
          "connectFromField": "other_resources.id",
          "connectToField": "outputs._id",
          "as": "prev",
      }},
      // create score depending if subject belongs to previous linked activities
      // (*): necessary for the following $in to work properly.
      { $unwind: {path: "$prev", "preserveNullAndEmptyArrays": true} }, // (*)
      { $unwind: {path: "$prev.subjects", "preserveNullAndEmptyArrays": true} }, // (*)
      { $addFields: { sbj_prev_involved: {
        $cond: { if: { $in: ["$prev.subjects.id", subjectIds] }, then: 1, else: 0 }
      } } },
      // sort first by text search score and then by subject being involved in linked activities
      { $sort: { score: { $meta: "textScore" }, sbj_prev_involved: -1 } },
      // unwind by output
      { $unwind: "$outputs" },
      // rename 'outputs' to 'output'
      { $addFields: {"output": "$outputs" } },
      { $project: { 'outputs': 0 } },
      // swap root and child (easier for clients)
      { $addFields: {"output.activity": '$$CURRENT' } },
      { $replaceRoot: { newRoot: "$output" } },
      { $project: { 'activity.output': 0 } },
    ])
    .exec()
  })
  .then(outputs => {
    return Activity.populate(outputs, {path: 'activity.subjects.id', model: 'Subject'})
  })
  .then(outputs => {
    return Activity.populate(outputs, {path: 'activity.prev.subjects.id', model: 'Subject'})
  })
  /*.then(outputs => {
    return Activity.populate(outputs, {path: 'software.id'})
  })
  .then(outputs => {
    return Activity.populate(outputs, {path: 'devices.id'})
  })
  .then(outputs => {
    return Activity.populate(outputs, {path: 'researchers.id'})
  })*/
  .then(outputs => {
    res.json({ outputs });
  })
  .catch(err => {
    res.status(500).send(err);
  })

}
