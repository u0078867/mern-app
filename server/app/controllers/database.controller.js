import mongoose from 'mongoose';

/**
 * Get all collections
 * @param req
 * @param res
 * @returns void
 */
export function getCollections(req, res) {
  //console.log(mongoose.connection.models)
  mongoose.connection.db.listCollections().toArray((err, colls) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    // Filter out internal use collections
    console.log(colls);
    try {
      collections = colls.filter(c => !['forms','subms'].includes(c.name));
      let models = mongoose.connection.models;
      collections = collections.map(c => {
        // Search corresponding model
        let model = Object.keys(models).filter(m => {
          return models[m].collection.collectionName == c.name
        })[0];
        const Model = models[model];
        // Add merge wented data from schema and model
        return {
          name: c.name,
          JSONSchema: Model.getJSONSchema(),
        };
      })
      res.json({ collections: collections });
    } catch (err) {
      return res.status(500).send(err);
    }
  });
}
