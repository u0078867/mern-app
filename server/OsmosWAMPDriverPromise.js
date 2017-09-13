//'use strict';

var autobahn = require('autobahn');

var Promise = require('native-or-bluebird');

var OsmosError = require('osmos-lite/lib/util/error');

// Extend autobahn Promise with nodeify features
require('nodeify').extend(autobahn.when.Promise);


var Driver = function OsmosWAMPDriver(options) {
  this.url = options.url || 'ws://127.0.0.1:8002/ws';
  this.realm = options.realm || 'realm1';
  this.dbType = options.db_type || 'mongo';
  this.dbPfx = this.dbType + '.';

  this.connection = null;
  this.session = null;

  this._rpc = (uri, argus) => {
    if (this.session) {
      //console.log(this.dbPfx + uri)
      return this.session.call(this.dbPfx + uri, argus);
    }
    return Promise.reject({
      err: true,
      msg: 'WAMP disconnected',
    });
  },

  this._tearDownConnection = () => {
    if (this.connection != null) { // close current connection if existing
        //if (this.connection.isOpen) {
            this.connection.close();
        //}
        this.connection = null;
        this.session = null;
    }
  }

  this._setUpNewConnection = (url, realm) => {
      this._tearDownConnection();
      if (url != "" && realm != "") {
          this.connection = new autobahn.Connection({
              url: url,
              realm: realm,
          });
          this.connection.onopen = (session, details) => {
              console.log("WAMP socket connected");
              this.session = session;

          }

          this.connection.onclose = (reason, details) => {
              console.log("WAMP socket disconnected");
              this.session = null;
          }

          this.connection.open();
      }
  }

  this._setUpNewConnection(this.url, this.realm);

};



Driver.prototype = {

  create : function (model, cb) {
    //console.log('created');
    return Promise.resolve({}).nodeify(cb);
  },

  get : function (model, key, cb) {
    var keyField = model.schema.primaryKey;
    return this._rpc('find_one', [model.bucket, {[keyField] : key}]).nodeify(cb);
  },

  post : function (document, data, cb) {
    var keyField = document.model.schema.primaryKey;
    return this._rpc('insert_one', [document.model.bucket, data]).nodeify(cb);
  },

  put : function (document, data, unset, cb) {
    if (!document.model.schema.primaryKey || !document.primaryKey) {
      throw new OsmosError('You cannot put a document without a primary key');
    }
    if (document.__originalData__[document.model.schema.primaryKey] === undefined) {
      return this.post(document, data, cb);
    }
    var keyField = document.model.schema.primaryKey;
    var key = document[keyField];
    return this._rpc('update_one', [document.model.bucket, {[keyField] : key}, data]).nodeify(cb);
  },

  del : function (model, key, cb) {
    var keyField = model.schema.primaryKey;
    return this._rpc('delete_one', [model.bucket, {[keyField] : key}]).nodeify(cb);
  },

  count: function (model, spec, cb) {
    return this._rpc('count', [model.bucket]).nodeify(cb);
  },

  findOne : function (model, spec, cb) {
    return this._rpc('find_one', [model.bucket, spec]).nodeify(cb);
  },

  find : function (model, spec, cb) {
    return this._rpc('find', [model.bucket, spec]).nodeify(cb);
  },

};

module.exports = Driver;
