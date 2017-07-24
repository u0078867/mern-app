import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import cuid from 'cuid';

if ('SWTool' in mongoose.connection.models)
  delete mongoose.connection.models['SWTool'];

const SWToolSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  version: { type: 'String', required: true, index: true },
  producer: { type: 'String', required: true, index: true },
  uri: { type: 'String', required: true, index: true },

  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { strict: false } );

SWToolSchema.index({ "$**": "text" });

export default mongoose.model('SWTool', SWToolSchema);
