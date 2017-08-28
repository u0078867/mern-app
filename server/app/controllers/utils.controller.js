
import jp from 'jsonpath';

import callApi from '../../../client/util/apiCaller';




var JSONSchemaDynToStat = (schema_in) => {

  // make a schema deep copy, to avoid side effects
  var schema = JSON.parse(JSON.stringify(schema_in));

  // search for replacers
  var nodes = jp.nodes(schema, '$..__replacer__');

  // return as as if no replacers are found
  if (nodes.length == 0) {
    return Promise.resolve(schema);
  }

  // create one promise per node
  var promises = nodes.map(node => {
    // Get parent path
    node.path.pop()
    let parent_path = jp.stringify(node.path);
    // Get value parent object
    let replacer = jp.value(schema, parent_path);
    // Return promise
    var promise_creator = (replacer_path, replacer) => {
      return new Promise((resolve, reject) => {
        // Run chain
        Promise.resolve()
        .then(() => {
          // extract query type
          var query = replacer.query.split(';');
          switch(query[0]) {
            case 'api':
              // apply API query
              var endpoint = query[1];
              return callApi(endpoint)
            default:
              throw 'query type not recognized';
          }
        })
        .then(res => {
          // extract select
          var select = replacer.select.split(';');
          //var select =
          switch(select[0]) {
            case 'jp':
              // apply JP select
              var jp_path = select[1];
              var list = jp.query(res, jp_path);
              // replace replacer with list
              jp.apply(schema, replacer_path, r => list);
              return
            default:
              throw 'select type not recognized';
          }
        })
        .then(() => resolve(replacer_path))
        .catch(err => reject(err))
      });
    }
    return promise_creator(parent_path, replacer);
  })

  // run promises in parallel
  return Promise.all(promises)
  .then(() => schema)
  .catch(err => {
    throw err;
  })
}


/**
 * Staticize JSON schema
 * @param req
 * @param res
 * @returns void
 */
export function staticizeJSONSchema(req, res) {
  JSONSchemaDynToStat(req.body.schema)
  .then(schema => {
    res.json({ schema });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
