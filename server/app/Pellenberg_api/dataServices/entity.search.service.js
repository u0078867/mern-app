import Models from 'MODELS_PATH/entity';



export function getItems(q, collection) {
  if (!(collection in Models)) {
    return Promise.reject("Collection does not exist");
  }
  let Model = Models[collection];
  return Model.find([
    { $match: { $or: [
        {$text: {$search: q}},
      ] }
    },
    { $addFields: { score: { $meta: "textScore" } } },
    { $sort: { score: { $meta: "textScore" } } },
  ])
}


export function getItemsByFields(fieldsQ, collection) {
  if (!(collection in Models)) {
    return Promise.reject("Collection does not exist");
  }
  let Model = Models[collection];
  return Model.find([
    { $match: { $and: fieldsQ } }
  ])
}
