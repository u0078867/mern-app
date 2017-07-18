import mongoose from 'mongoose';
const Schema = mongoose.Schema;

if ('Device' in mongoose.connection.models)
  delete mongoose.connection.models['Device'];

const deviceSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  type: { type: 'String', required: true, index: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

deviceSchema.index({ "$**": "text" });

export default mongoose.model('Device', deviceSchema);
