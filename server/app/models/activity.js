import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
import cuid from 'cuid';

import fs from 'fs';
import path from 'path';

if ('Activity' in mongoose.connection.models)
  delete mongoose.connection.models['Activity'];

const activitySchema = new Schema({
  name: { type: 'String', required: true, index: true },
  researchers: [{
    id: { type: 'String', required: true, index: true },
    _id: false,
  }],
  subjects: [{
    id: { type: 'String', required: true, index: true },
    _id: false,
  }],
  devices: [{
    id: { type: 'String', required: true, index: true },
    _id: false,
  }],
  software: [{
    id: { type: 'String', required: true, index: true },
    _id: false,
  }],
  other_resources: [{
    id: { type: 'String', required: true, index: true,  },
    _id: false,
  }],
  outputs: [{
    _id: false,
    cuid: { type: 'String', default: cuid, required: true, index: true },
    name: { type: 'String', required: true, index: true },
    uri: { type: 'String', required: false, index: true },
    metadata: [{
      name: { type: 'String', required: true, },
      value: { type: 'Mixed', required: true, index: true },
      uom: { type: 'String', },
      _id: false,
    }],
  }],

  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { strict: false, toObject: {virtuals: true} } );

activitySchema.virtual('activity.subjects', {
  ref: 'Subject',
  localField: 'activity.subjects.id',
  foreignField: 'cuid',
  justOne: true
});

activitySchema.virtual('activity.prev.subject', {
  ref: 'Subject',
  localField: 'activity.prev.subjects.id',
  foreignField: 'cuid',
  justOne: true
});

let jsonSchema = JSON.parse(fs.readFileSync(path.posix.normalize(__dirname) + '/activity.json'));
//let jsonSchema = JSON.parse(fs.readFileSync(path.resolve('./activity.json')));

activitySchema.statics.getJSONSchema = () => {
  return jsonSchema;
};

activitySchema.index({ "$**": "text" });

export default mongoose.model('Activity', activitySchema);
