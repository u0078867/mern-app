
import cuid from 'cuid';
import config from '../../config';
//import Minio from 'minio';
const Minio = require('minio')

/*var client = new Minio.Client({
    endPoint: '10.33.173.254',
    port: 9000,
    secure: true,
    accessKey: '0118IS4U0M076C9KXBDW',
    secretKey: 'Qwt9jD8yU+9Zmv8PQO1uaC3hArRf4dZB641q/MBt'
})*/

var client = new Minio.Client({
    endPoint: config.minioUrl,
    port: config.minioPort,
    secure: true,
    accessKey: config.minioAccessKey,
    secretKey: config.minioSecretKey
})

function makeBucketIfNotExist(client, bucket) {
  return client.bucketExists(bucket)
  .catch(err => {
    if (err.code == 'NoSuchBucket') {
      console.log(`creating bucket ${bucket} ...`);
      return client.makeBucket(bucket, 'us-east-1');
    } else {
      return Promise.reject(err);
    }
  })
  .then(() => console.log(`bucket ${bucket} found`))
}


export function getPresignedPutUrl(req, res) {
  let name = req.query.name || cuid();
  let bucket = config.minioBucket;
  makeBucketIfNotExist(client, bucket)
  .then(() => client.presignedPutObject(bucket, name))
  .then(url => {
    res.json({ url, bucket, name });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

export function getPresignedGetUrl(req, res) {
  Promise.resolve()
  .then(() => client.presignedGetObject(config.minioBucket, req.query.name))
  .then(url => {
    res.json({ url });
  })
  .catch(err => {
    res.status(500).send(err);
  })
}

export function removeObject(req, res) {
  Promise.resolve()
  .then(() => client.removeObject(config.minioBucket, req.query.name))
  .then(() => {
    res.status(200).json(null);
  })
  .catch(err => {
    res.status(500).send(err);
  })
}
