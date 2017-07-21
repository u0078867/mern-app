import mongoose from 'mongoose';

/**
 * Get all collections
 * @param req
 * @param res
 * @returns void
 */
export function getCollections(req, res) {
  //console.log(mongoose.connection.models)
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      return res.status(500).send(err);
    }
    let collections2 = collections.filter(c => !['forms','subms'].includes(c.name));
    res.json({ collections: collections2 });
  });
}
