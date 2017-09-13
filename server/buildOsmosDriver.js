
import Osmos from 'osmos-lite';
Osmos.Document.debug = false;

var MongoClient = require('mongodb').MongoClient;

import WAMPDriver from './OsmosWAMPDriverPromise';
import MongoDriver from './OsmosMongoDriverPromise';


module.exports = function(config, cb) {

  switch (config.osmosDriver) {

    case 'WAMP':
      Osmos.drivers.register('db', new WAMPDriver({
        url: config.drvWAMPUrl,
        realm: config.drvWAMPRealm,
        db_type: config.drvWAMPtargetDb,
      }));
      console.log('Osmos WAMP driver created');
      cb();
      break;

    case 'mongo':
      MongoClient.connect(config.drvMongoURL, {
        promiseLibrary: require('native-or-bluebird')
      }, function(err, db) {
        if (err) throw err;
        Osmos.drivers.register('db', new MongoDriver(db));
        console.log('Osmos Mongo driver created');
        cb();
      });
      break;

    default:
      throw new Error(`Driver ${config.osmosDriver} not implemented`);

  }
};
