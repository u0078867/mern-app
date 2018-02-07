import mongoose from 'mongoose';
import Models from '../models/entity';

/**
 * Get all collections
 * @param req
 * @param res
 * @returns void
 */
export function getCollections(req, res) {
  try {
    var collections = [];
    for (var collection in Models) {
      collections.push({
        name: collection,
        title: Models[collection].getTitle(),
        JSONSchema: Models[collection].getJSONSchema(),
      })
    }
    res.json({ collections: collections });
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
}
