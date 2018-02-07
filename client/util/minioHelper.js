
import callApi from './apiCaller';


export function MinIOUploader(file, { useAlias = false, progressCb = ( (progress, name) => {} ) }) {

  this.file = file;
  this.progressCb = progressCb;
  this.name = useAlias ? undefined : file.name;
  this.bucket = undefined;

  this._uploadFile = (file, url, progressCb) => {
    var xhr = new XMLHttpRequest(); // see https://hpbn.co/xmlhttprequest/
    this.xhr = xhr;
    return new Promise((resolve, reject) => {
      xhr.open('PUT', url, true);
      xhr.onload = () => {
        if (xhr.status == 200) {
          //resolve(xhr.responseText);
          resolve({
            name: this.name,
            bucket: this.bucket,
          });
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

  this.upload = () => {
    let url = 'minio/presigned-put-url';
    if (!useAlias) url += `?name=${this.name}`;
    return callApi(url)
    .then(res => {
      this.name = res.name;
      this.bucket = res.bucket;
      return this._uploadFile(this.file, res.url, this.progressCb);
    });
  }

  this.abort = () => {
    this.xhr.abort();
  }

}
