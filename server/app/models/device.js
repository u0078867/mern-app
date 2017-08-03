import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import cuid from 'cuid';

import config from '../../config';
import json2mongoose from './utils/schemaConverters';
import path from 'path';
import fs from 'fs';

if ('Device' in mongoose.connection.models)
  delete mongoose.connection.models['Device'];

/*const deviceSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  type: { type: 'String', required: true, index: true },
  producer: { type: 'String', required: true, index: true },
  uri: { type: 'String', required: true, index: true },

  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { strict: false } );*/

//let jsonSchema = require(config.schemasDir + '/device.json')

let jsonSchema = JSON.parse(fs.readFileSync(config.schemasDir + '/device.json'));
let schema = json2mongoose(undefined, jsonSchema);
schema = Object.assign(schema, {
  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

const deviceSchema = new Schema(schema, {
  strict: false
});

deviceSchema.statics.getJSONSchema = () => {
  return jsonSchema;
};

deviceSchema.index({ "$**": "text" });

export default mongoose.model('Device', deviceSchema);
