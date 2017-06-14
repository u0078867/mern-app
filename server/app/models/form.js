import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const formSchema = new Schema({
  title: { type: 'String', required: true },
  json_schema: { type: 'Mixed', required: true },
  ui_schema: { type: 'Mixed', required: true },
  init_data: { type: 'Mixed', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});
if ('Form' in mongoose.connection.models)
  delete mongoose.connection.models['Form'];

export default mongoose.model('Form', formSchema);
