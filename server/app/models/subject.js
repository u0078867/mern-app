import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import cuid from 'cuid';

import config from '../../config';
import json2mongoose from './utils/schemaConverters';
import path from 'path';
import fs from 'fs';

if ('Subject' in mongoose.connection.models)
  delete mongoose.connection.models['Subject'];

/*const subjectSchema = new Schema({
  //name: { type: 'String', required: true, index: true },
  //surname: { type: 'String', required: true, index: true },
  //birthdate: { type: 'String', required: true, index: true },
  attributes: [{
    name: { type: 'String', required: true},
    value: { type: 'Mixed', required: true, index: true },
    //uom: { type: 'String', required: true},
    _id: false,
  }],

  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { strict: false } );*/

let jsonSchema = JSON.parse(fs.readFileSync(config.schemasDir + '/subject.json'));
let schema = json2mongoose(undefined, jsonSchema);
schema = Object.assign(schema, {
  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

const subjectSchema = new Schema(schema, {
  strict: false
});

subjectSchema.statics.getJSONSchema = () => {
  return jsonSchema;
};

subjectSchema.index({ "$**": "text" });

export default mongoose.model('Subject', subjectSchema);
