import createMongooseSchema from 'json-schema-to-mongoose';

export default function json2mongoose(refs, schema) {
  schema.$schema = "http://json-schema.org/draft-04/schema#"; // necessary for "required" property
  let mongooseSchema = createMongooseSchema(refs, schema);
  return mongooseSchema;
}
