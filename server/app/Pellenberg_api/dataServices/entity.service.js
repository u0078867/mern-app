import Models from 'MODELS_PATH/entity';


export function getAllItems(collection) {
  if (!(collection in Models)) {
    return Promise.reject("Collection does not exist");
  }
  let Model = Models[collection];
  return Model.find({});
}


export function getItems(cuids, collection) {
  if (!(collection in Models)) {
    return Promise.reject("Collection does not exist");
  }
  let Model = Models[collection];
  return Model.find({
    cuid: { $in: cuids }
  });
}


export function getItem(cuid, collection) {
  if (!(collection in Models)) {
    return Promise.reject("Collection does not exist");
  }
  let Model = Models[collection];
  return Model.get(cuid).then(p => {console.log(p); return p});
}
