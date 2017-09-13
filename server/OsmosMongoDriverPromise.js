

var Promise = require('native-or-bluebird');

var OsmosError = require('osmos-lite/lib/util/error');



var Driver = function OsmosMongoDriver(db) {
  this.db = db;
  this.ensureTextSearch = function (collection) {
    return this.db.collection(collection).ensureIndex({"$**": "text"});
  }
};



Driver.prototype = {

  create : function (model, cb) {
    //console.log(`create: ${model.bucket}`)
    //this.ensureTextSearch(model.bucket);
    return Promise.resolve({}).nodeify(cb);
  },

  get : function (model, key, cb) {
    var keyField = model.schema.primaryKey;
    return this.ensureTextSearch(model.bucket)
    .then(() => this.db.collection(model.bucket).findOne({[keyField] : key}).nodeify(cb))
    //return this.db.collection(model.bucket).findOne({[keyField] : key}).nodeify(cb);
  },

  post : function (document, data, cb) {
    var keyField = document.model.schema.primaryKey;
    return this.ensureTextSearch(document.model.bucket)
    .then(() => this.db.collection(document.model.bucket).insertOne(data).nodeify(cb))
    //return this.db.collection(document.model.bucket).insertOne(data).nodeify(cb);
  },

  put : function (document, set, unset, cb) {
    if (!document.model.schema.primaryKey || !document.primaryKey) {
      throw new OsmosError('You cannot put a document without a primary key');
    }
    if (document.__originalData__[document.model.schema.primaryKey] === undefined) {
      return this.post(document, set, cb);
    }
    var keyField = document.model.schema.primaryKey;
    var key = document[keyField];
    var update = {};
    if (Object.keys(set).length > 0) update.$set = set;
    if (Object.keys(unset).length > 0) update.$unset = unset;
    return this.ensureTextSearch(document.model.bucket)
    .then(() => {
      return this.db.collection(document.model.bucket).findOneAndUpdate({[keyField] : key},
        update,
        {
          returnOriginal: false,
          upsert: true,
        }
      ).nodeify(cb)
    })
    //return this.db.collection(document.model.bucket).findOneAndReplace({[keyField] : key}, data).nodeify(cb);
  },

  del : function (model, key, cb) {
    var keyField = model.schema.primaryKey;
    return this.ensureTextSearch(model.bucket)
    .then(() => this.db.collection(model.bucket).deleteOne({[keyField] : key}).nodeify(cb))
    //return this.db.collection(model.bucket).deleteOne({[keyField] : key}).nodeify(cb);
  },

  count: function (model, spec, cb) {
    return this.ensureTextSearch(model.bucket)
    .then(() => this.db.collection(model.bucket).count(spec).nodeify(cb))
    //return this.db.collection(model.bucket).count(spec).nodeify(cb);
  },

  findOne : function (model, spec, cb) {
    return this.ensureTextSearch(model.bucket)
    .then(() => this.db.collection(model.bucket).findOne(spec).nodeify(cb))
    //return this.db.collection(model.bucket).findOne(spec).nodeify(cb);
  },

  find : function (model, spec, cb) {
    /*this.ensureTextSearch(model.bucket);
    if (Array.isArray(spec)) {
      return this.db.collection(model.bucket).aggregate(spec).toArray().nodeify(cb);
    } else {
      return this.db.collection(model.bucket).find(spec).toArray().nodeify(cb);
    }*/
    return this.ensureTextSearch(model.bucket)
    .then(() => {
      //console.log(`find: ${model.bucket}`)
      if (Array.isArray(spec)) {
        return this.db.collection(model.bucket).aggregate(spec).toArray().nodeify(cb);
      } else {
        return this.db.collection(model.bucket).find(spec).toArray().nodeify(cb);
      }
    })
  },

};

module.exports = Driver;
