import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import cuid from 'cuid';

if ('Subm' in mongoose.connection.models)
  delete mongoose.connection.models['Subm'];

const submSchema = new Schema({
  data: { type: 'Mixed', required: true },
  form: { type: Schema.ObjectId, required: true, ref: 'Form' },
  validate_before_insert : {type: Boolean, required: true},
  slug: { type: 'String', required: true },
  cuid: { type: 'String', default: cuid, required: true, index: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Subm', submSchema);
