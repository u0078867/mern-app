import fetch from 'isomorphic-fetch';
import Config from '../../server/config';

export const GRAPHQL_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://127.0.0.1:${process.env.PORT || Config.port}/graphql`) :
  '/graphql';

export default function callGraphQL(operation, variables) {
  return fetch(`${GRAPHQL_URL}`, {
    headers: { 'content-type': 'application/json' },
    method: 'post',
    body: JSON.stringify({
      query: operation,
      variables
    }),
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    let { data, errors } = json;
    if (data) {
      return data;
    }
    if (errors) {
      return Promise.reject(errors);
    }
  })
}

// https://facebook.github.io/relay/docs/en/quick-start-guide.html
export function callGraphQLForRelay(operation, variables) {
  return fetch(`${GRAPHQL_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}
