const path = require('path');

const dotenv = require('dotenv');

let envPath = path.join(__dirname, '../../env');
dotenv.config({path: envPath});
dotenv.load();

const Minio = require('minio');

var client = new Minio.Client({
    endPoint: process.env.MINIO_URL,
    port: parseInt(process.env.MINIO_PORT),
    secure: true,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
});

console.log(`connected to ${process.env.MINIO_URL}:${process.env.MINIO_PORT}`)
