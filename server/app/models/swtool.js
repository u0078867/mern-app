import mongoose from 'mongoose';
const Schema = mongoose.Schema;

if ('SWTool' in mongoose.connection.models)
  delete mongoose.connection.models['SWTool'];

const SWToolSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  version: { type: 'String', required: true, index: true },
  company: { type: 'String', required: false, index: true },
  download_uri: { type: 'String', required: true, index: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

SWToolSchema.index({ "$**": "text" });

export default mongoose.model('SWTool', SWToolSchema);
