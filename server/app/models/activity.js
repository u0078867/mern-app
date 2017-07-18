import mongoose from 'mongoose';
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

if ('Activity' in mongoose.connection.models)
  delete mongoose.connection.models['Activity'];

const activitySchema = new Schema({
  description: { type: 'String', required: true, index: true },
  researchers: [{
    id: { type: ObjectId, required: true, index: true, ref: 'Researcher' },
    _id: false,
  }],
  subjects: [{
    id: { type: ObjectId, required: true, index: true, ref: 'Subject' },
    _id: false,
  }],
  devices: [{
    id: { type: ObjectId, required: true, index: true, ref: 'Device' },
    _id: false,
  }],
  software: [{
    id: { type: ObjectId, required: true, index: true, ref: 'SWTool' },
    _id: false,
  }],
  other_resources: [{
    id: { type: ObjectId, required: true, index: true,  },
    _id: false,
  }],
  outputs: [{
    _id: { type: ObjectId, required: true, index: true },
    cuid: { type: 'String', required: true, index: true },
    name: { type: 'String', required: true, index: true },
    uri: { type: 'String', required: false, index: true },
  }],
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

activitySchema.index({ "$**": "text" });

export default mongoose.model('Activity', activitySchema);
