import Models from 'MODELS_PATH/entity';



export function getItems(req, res) {
  let q = req.query.q;
  let collection = req.params.collection;
  if (!(collection in Models)) {
    return res.status(500).send("Collection does not exist");
  }
  let Model = Models[collection];
  Model.find([
    { $match: { $or: [
        {$text: {$search: q}},
      ] }
    },
    { $addFields: { score: { $meta: "textScore" } } },
    { $sort: { score: { $meta: "textScore" } } },
  ], (err, items) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ items });
  })
}
