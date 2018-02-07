import Models from 'MODELS_PATH/entity';


export function getAllOutputs() {
  let Model = Models['activities'];
  return Model.findNoValidate([
    { $unwind : "$outputs" }
  ]);
}


export function getOutputs(cuids) {
  let Model = Models['activities'];
  return Model.findNoValidate([
    { $match: {"outputs.cuid": {$in: cuids}}},
    { $unwind: "$outputs" },
    { $match: {"outputs.cuid": {$in: cuids}}},
    { $addFields: {"output": "$outputs" } },
    { $project: { 'outputs': 0 } },
    { $addFields: {"output.activity": '$$CURRENT' } },
    { $replaceRoot: { newRoot: "$output" } },
    { $project: { 'activity.output': 0 } },
  ]);
}


export function getOutput(cuid) {
  let Model = Models['activities'];
  return Model.findNoValidate([
    { $match: {"outputs.cuid": cuid}},
    { $unwind: "$outputs" },
    { $match: {"outputs.cuid": cuid}},
    { $addFields: {"output": "$outputs" } },
    { $project: { 'outputs': 0 } },
    { $addFields: {"output.activity": '$$CURRENT' } },
    { $replaceRoot: { newRoot: "$output" } },
    { $project: { 'activity.output': 0 } },
  ])
  .then(outputs => {
    var output = undefined;
    if (outputs) output = outputs[0];
    return output;
  });
}
