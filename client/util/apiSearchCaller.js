import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import { getAccessTokenHeaders } from './apiUtils';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://127.0.0.1:${process.env.PORT || Config.port}/search-api`) :
  '/search-api';

export default function callApi(endpoint, query, token = null) {
  let headers = getAccessTokenHeaders(token);
  return fetch(`${API_URL}/${endpoint}?q=${query}`, {
    headers: Object.assign({}, headers, { 'content-type': 'application/json' }),
    method: 'get',
  })
  .then(response => response.json().then(json => ({ json, response })))
  .then(({ json, response }) => {
    if (!response.ok) {
      return Promise.reject(json);
    }
    return json;
  })
  /*.then(
    response => response,
    error => error
  );*/
}
