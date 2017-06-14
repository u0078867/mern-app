import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: { type: 'String', required: true },
  surname: { type: 'String', required: true },
  birthdate: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Subject', subjectSchema);
