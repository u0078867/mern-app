import Models from 'MODELS_PATH/entity';

/**
 * Get all items
 * @param req
 * @param res
 * @returns void
 */
export function getItems(req, res) {
  //console.log('getItems');
  let collection = req.params.collection;
  //console.log(collection)
  if (!(collection in Models)) {
    return res.status(500).send("Collection does not exist");
  }
  //console.log(Models)
  let Model = Models[collection];
  Model.find({}, (err, items) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ items });
  });
}

/**
 * Get a single item
 * @param req
 * @param res
 * @returns void
 */
export function getItem(req, res) {
  let collection = req.params.collection;
  if (!(collection in Models)) {
    return res.status(500).send("Collection does not exist");
  }
  let Model = Models[collection];
  Model.get(req.params.cuid, (err, item) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ item });
  });
}
