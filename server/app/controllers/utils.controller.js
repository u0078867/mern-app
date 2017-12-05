
import jp from 'jsonpath';
import _ from 'lodash';

import mustache from 'mustache';

import callApi from '../../../client/util/apiCaller';
import callSearchApi from '../../../client/util/apiSearchCaller';



var JSONSchemaDynToStat = (schema_in, data_in) => {

  // fill template
  var schema = JSON.parse(mustache.render(JSON.stringify(schema_in), data_in));

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
          // return parse value, if existing
          if (replacer.strValue) {
            return JSON.parse(replacer.strValue);
          }
          if (replacer.valueFromVar) {
            return data_in[replacer.valueFromVar];
          }
          // extract query type
          var query = replacer.query.split(';');
          switch(query[0]) {
            case 'api':
              // apply API query
              var endpoint = query[1];
              return callApi(endpoint);
            case 'search-api':
              // apply API query
              var endpoint = query[1];
              return callSearchApi(endpoint, query[2]);
            default:
              throw 'query type not recognized';
          }
        })
        .then(res => {
          if (!replacer.select)
            return res;
          // extract select
          var select = replacer.select.split(';');
          switch(select[0]) {
            case 'jp':
              // apply JP select
              var jp_path = select[1];
              var list = jp.query(res, jp_path);
              return list;
            case '_':
              // apply lodash select
              var lodash_path = select[1];
              var list = _.get(res, lodash_path);
              return list;
            default:
              throw 'select type not recognized';
          }
        })
        .then(data => {
          // replace replacer with list
          jp.apply(schema, replacer_path, r => data);
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
  JSONSchemaDynToStat(req.body.schema, req.body.data)
  .then(schema => {
    res.json({ schema });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
