import mongoose from 'mongoose';
const Schema = mongoose.Schema;

if ('Researcher' in mongoose.connection.models)
  delete mongoose.connection.models['Researcher'];

const researcherSchema = new Schema({
  name: { type: 'String', required: true, index: true },
  surname: { type: 'String', required: true, index: true },
  birthdate: { type: 'String', required: true, index: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  date_added: { type: 'Date', default: Date.now, required: true },
});

researcherSchema.index({ "$**": "text" });

export default mongoose.model('Researcher', researcherSchema);
