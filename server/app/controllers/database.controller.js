import mongoose from 'mongoose';

/**
 * Get all collections
 * @param req
 * @param res
 * @returns void
 */
export function getCollections(req, res) {
  //console.log(mongoose.connection.models)
  try {
  mongoose.connection.db.listCollections().toArray((err, colls) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    // Filter out internal use collections
    console.log(colls);
    try {
      //var collections = colls.filter(c => !['forms','subms'].includes(c.name));
      var collections = colls.filter(c => ['subjects','researchers','devices','swtools','activities'].includes(c.name));
      let models = mongoose.connection.models;
      //console.log('models:');
      //console.log(models);
      collections = collections.map(c => {
        // Search corresponding model
        //console.log('model:');
        let model = Object.keys(models).filter(m => {
          //console.log(models[m].collection.collectionName);
          return models[m].collection.collectionName == c.name
        })[0];
        //console.log('model found:');
        //console.log(model);
        const Model = models[model];
        //console.log('model class extracted');
        //console.log(Model);
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
  } catch (err) {
    return res.status(500).send(err);
  }
}
