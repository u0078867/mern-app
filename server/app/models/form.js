import mongoose from 'mongoose';
const Schema = mongoose.Schema;

if ('Form' in mongoose.connection.models)
  delete mongoose.connection.models['Form'];

const formSchema = new Schema({
  title: { type: 'String', required: true },
  json_schema: { type: 'Mixed', required: true },
  ui_schema: { type: 'Mixed', required: true },
  init_data: { type: 'Mixed', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { minimize: false });

export default mongoose.model('Form', formSchema);
