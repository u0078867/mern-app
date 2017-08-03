import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import cuid from 'cuid';

import config from '../../config';
import json2mongoose from './utils/schemaConverters';
import path from 'path';
import fs from 'fs';

if ('Researcher' in mongoose.connection.models)
  delete mongoose.connection.models['Researcher'];

/*const researcherSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  surname: { type: 'String', required: true, index: true },
  birthdate: { type: 'String', required: true, index: true },

  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { strict: false } );*/

let jsonSchema = JSON.parse(fs.readFileSync(config.schemasDir + '/researcher.json'));
let schema = json2mongoose(undefined, jsonSchema);
schema = Object.assign(schema, {
  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

const researcherSchema = new Schema(schema, {
  strict: false
});

researcherSchema.statics.getJSONSchema = () => {
  return jsonSchema;
};

researcherSchema.index({ "$**": "text" });

export default mongoose.model('Researcher', researcherSchema);
