import fetch from 'isomorphic-fetch';
import Config from '../../server/config';
import { getAccessTokenHeaders } from './apiUtils';

export const API_URL = (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
  process.env.BASE_URL || (`http://127.0.0.1:${process.env.PORT || Config.port}/api`) :
  '/api';

export default function callApi(endpoint, method = 'get', body, noAuth = false, token = null) {
  let headers = noAuth ? {} : getAccessTokenHeaders(token);
  return fetch(`${API_URL}/${endpoint}`, {
    headers: Object.assign({}, headers, { 'content-type': 'application/json' }),
    method,
    body: JSON.stringify(body),
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

export function uploadFile(file) {
  let data = new FormData();
  data.append('file', file);
  return fetch(`${API_URL}/upload/file`, {
    method: 'POST',
    body: data
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

export function uploadFileMinIO(file, progressCb) {

  function uploadFile(file, url, progressCb) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest(); // see https://hpbn.co/xmlhttprequest/
      xhr.open('PUT', url, true);
      xhr.onload = () => {
        if (xhr.status == 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
      xhr.addEventListener('error', e => {
        reject(xhr.statusText);
      });
      xhr.upload.addEventListener('progress', e => {
        let progress = 100. * e.loaded / e.total;
        progressCb(progress, file.name);
      });
      xhr.send(file);
    });
  }

  return callApi(`minio/presigned-put-url?name=${file.name}`)
  .then(res => uploadFile(file, res.url, progressCb));
}
