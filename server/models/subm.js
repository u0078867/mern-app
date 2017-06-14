import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const submSchema = new Schema({
  data: { type: 'Mixed', required: true },
  form: { type: Schema.ObjectId, required: true, ref: 'Form' },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Subm', submSchema);
