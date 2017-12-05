
import callApi from 'CLIENT_UTIL/apiCaller';


export function fillJSON(schema, data) {
  if (schema != undefined) {
    return callApi('utils/staticize-json-schema', 'post', {
      schema,
      data,
    })
  } else {
    return Promise.resolve({});
  }
}

export function fillFormJSONProps({JSONSchema, UISchema, initData, variables}) {
  let promises = [
    fillJSON(JSONSchema, variables),
    fillJSON(UISchema, variables),
    fillJSON(initData, variables),
  ];
  return Promise.all(promises)
  .then(res => {
    let converted = {
      convertedJSONSchema: res[0].schema,
      convertedUISchema: res[1].schema,
      convertedInitData: res[2].schema,
    }
    return converted;
  })
}
