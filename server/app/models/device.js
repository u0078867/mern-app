import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import cuid from 'cuid';

if ('Device' in mongoose.connection.models)
  delete mongoose.connection.models['Device'];

const deviceSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  type: { type: 'String', required: true, index: true },
  producer: { type: 'String', required: true, index: true },
  uri: { type: 'String', required: true, index: true },

  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { strict: false } );

deviceSchema.index({ "$**": "text" });

export default mongoose.model('Device', deviceSchema);
