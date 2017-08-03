import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import cuid from 'cuid';

import config from '../../config';
import json2mongoose from './utils/schemaConverters';
import path from 'path';
import fs from 'fs';

if ('SWTool' in mongoose.connection.models)
  delete mongoose.connection.models['SWTool'];

/*const SWToolSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  version: { type: 'String', required: true, index: true },
  producer: { type: 'String', required: true, index: true },
  uri: { type: 'String', required: true, index: true },

  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { strict: false } );*/

let jsonSchema = JSON.parse(fs.readFileSync(config.schemasDir + '/software.json'));
let schema = json2mongoose(undefined, jsonSchema);
schema = Object.assign(schema, {
  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

const SWToolSchema = new Schema(schema, {
  strict: false
});

SWToolSchema.statics.getJSONSchema = () => {
  return jsonSchema;
};

SWToolSchema.index({ "$**": "text" });

export default mongoose.model('SWTool', SWToolSchema);
