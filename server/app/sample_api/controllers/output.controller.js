import Models from 'MODELS_PATH/entity';

/**
 * Get all outputs
 * @param req
 * @param res
 * @returns void
 */
export function getOutputs(req, res) {
  let Model = Models['activities'];
  Model.findNoValidate([
    { $unwind : "$outputs" }
  ], (err, items) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ items });
  });
}

/**
 * Get a single output
 * @param req
 * @param res
 * @returns void
 */
export function getOutput(req, res) {
  let Model = Models['activities'];
  //Model.find([
  Model.findNoValidate([
    { $match: {"outputs.cuid": req.params.cuid}},
    { $unwind: "$outputs" },
    { $match: {"outputs.cuid": req.params.cuid}},
    { $addFields: {"output": "$outputs" } },
    { $project: { 'outputs': 0 } },
    { $addFields: {"output.activity": '$$CURRENT' } },
    { $replaceRoot: { newRoot: "$output" } },
    { $project: { 'activity.output': 0 } },
  ], (err, outputs) => {
    if (err) {
      return res.status(500).send(err);
    }
    var output = undefined;
    if (outputs) output = outputs[0];
    res.json({ item: output });
  });
}
