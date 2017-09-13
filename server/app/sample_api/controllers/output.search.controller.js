
import Models from 'MODELS_PATH/entity';



export function getOutputs(req, res) {
  let q = req.query.q;
  Models['subjects'].find({
    $or: [
      {$text: {$search: q}},
    ]
  })
  .then(subjects => {
    return subjects.map(s => s.cuid);
  })
  .then(subjectIds => {
    return Models['activities'].findNoValidate([
      // text search in activities
      { $match: { $or: [
          {$text: {$search: q}},
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
          "connectToField": "outputs.cuid",
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
      // populate activity.prev.subject
      { $lookup:
          {
            from: "subjects",
            localField: "activity.prev.subjects.id",
            foreignField: "cuid",
            as: "activity.prev.subject"
          }
      },
      { $unwind: {path: "$activity.prev.subject", "preserveNullAndEmptyArrays": true} },
      { $project: { 'activity.prev.subjects': 0 } },
      // populate activity.subject
      // (*): necessary for the following localField to work properly.
      { $unwind: {path: "$activity.subjects", "preserveNullAndEmptyArrays": true} },  // (*)
      { $lookup:
          {
            from: "subjects",
            localField: "activity.subjects.id",
            foreignField: "cuid",
            as: "activity.subject"
          }
      },
      { $unwind: {path: "$activity.subject", "preserveNullAndEmptyArrays": true} },
      { $project: { 'activity.subjects': 0 } },
    ])
  })
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res.status(500).send(err);
  })

}
