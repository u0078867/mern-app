Data schema validation is performed via [mongoose schemas](http://mongoosejs.com/docs/guide.html) in this folder.

However, schema for the same data is also indicated here [here](examples/sample_forms). This is used to create automatically the UI representation of the forms from the data model. The best situation would be to automatically generate mongoose schemas from JSON schema, having one source of truth. I will commit to try the following libraries out:
- https://github.com/jon49/json-schema-to-mongoose

The server side schema is not [strict](http://mongoosejs.com/docs/guide.html#strict) (``{strict: false}``), so other fields are allowed.

``activities`` collection links to other data by using their ``cuid`` field (see [here](https://github.com/ericelliott/cuid)). It is structured in a very similar way as ObjectId, but with the following advantages:
- it is not an object, but a string; this avoids wrapping/unwrapping of strings in id comparisons; this may also help automatic conversion from JSON schema to mongoose schema (ObjectId is not a native JSON schema type).
- it is not mongo-specific, so migrating from mongo db to another one day would be more dependency free;

``subjects`` (the subject under investigation), can be anything, from humans to specimens, so the model should be general enough. That is way it is composed by one single array field, ``attributes``, each of them being an object with attribute name, value and measurement unit.
