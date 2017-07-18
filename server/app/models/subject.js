import mongoose from 'mongoose';
const Schema = mongoose.Schema;

if ('Subject' in mongoose.connection.models)
  delete mongoose.connection.models['Subject'];

const subjectSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  surname: { type: 'String', required: true, index: true },
  birthdate: { type: 'String', required: true, index: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

subjectSchema.index({ "$**": "text" });

export default mongoose.model('Subject', subjectSchema);
