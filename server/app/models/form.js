import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import cuid from 'cuid';

if ('Form' in mongoose.connection.models)
  delete mongoose.connection.models['Form'];

const formSchema = new Schema({
  title: { type: 'String', required: true },
  json_schema: { type: 'Mixed', required: true },
  ui_schema: { type: 'Mixed', required: true },
  init_data: { type: 'Mixed', required: true },
  dest_collection: { type: 'String', required: true },
  insert_on_submit: { type: 'Boolean', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
}, { minimize: false }); // to allow empty objects

export default mongoose.model('Form', formSchema);
