import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import { getAccessTokenHeaders } from './apiUtils';

import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

export const GRAPHQL_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://127.0.0.1:${process.env.PORT || Config.port}/graphql`) :
  '/graphql';

export default function callGraphQL(operation, variables) {
  let headers = getAccessTokenHeaders(null);
  return fetch(`${GRAPHQL_URL}`, {
    headers: Object.assign({}, headers, { 'content-type': 'application/json' }),
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
  let headers = getAccessTokenHeaders();
  return fetch(`${GRAPHQL_URL}`, {
    method: 'POST',
    headers: Object.assign({}, headers, { 'Content-type': 'application/json' }),
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

export const relayEnvironment = new Environment({
  network: Network.create(callGraphQLForRelay),
  store: new Store(new RecordSource()),
});
