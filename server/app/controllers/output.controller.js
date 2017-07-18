import Activity from '../models/activity';


/**
 * Get all devices
 * @param req
 * @param res
 * @returns void
 */
export function getOutputs(req, res) {
  Activity
  .aggregate([
    { $unwind : "$outputs" }
  ])
  .exec((err, outputs) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ outputs });
  });
}

/**
 * Get a single device
 * @param req
 * @param res
 * @returns void
 */
export function getOutput(req, res) {
  Activity
  .aggregate([
    { $match: {"outputs.cuid": req.params.cuid}},
    { $unwind: "$outputs" },
    { $match: {"outputs.cuid": req.params.cuid}},
    { $addFields: {"output": "$outputs" } },
    { $project: { 'outputs': 0 } },
    { $addFields: {"output.activity": '$$CURRENT' } },
    { $replaceRoot: { newRoot: "$output" } },
    { $project: { 'activity.output': 0 } },
  ])
  .exec((err, outputs) => {
    if (err) {
      return res.status(500).send(err);
    }
    var output = undefined;
    if (outputs) output = outputs[0];
    res.json({ output });
  });
}
