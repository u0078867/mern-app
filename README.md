### Documentation:

You can find specific README.md files inside the subfolders.
Documentation is still under development.

### For production:

Install dependencies:

```
npm install
```

Set environment build variables (example):

```
API_PATH=server/app/Pellenberg_api
DB_PREFILLER_PATH=server/app/TAMTA_db_prefiller
JSS_WIDGETS_PATH=client/components/JSSForm/Pellenberg_jss_widgets
DATA_VIEWERS=client/components/PellenbergViewers
MODULE_LOGIN=client/modules/LoginPellenberg
MODULE_DASHBOARD=client/modules/DashboardPellenberg
MODULE_QUERY=client/modules/QueryPellenberg
CONTAINER_CLASS=client/components/PellenbergContainer
LOGGED_CONTAINER_CLASS=client/components/PellenbergLoggedInContainer
SUBMITTERS_PATH=client/modules/Form/components/PellenbergSubmitters
```

Clean dist folder:

```
npm run clean
```


Build:

```
npm run build:server
```

```
npm run build:client
```

Set environment runtime variables (example):

```
PORT=8000
SCHEMAS_DIR=./Pellenberg_schemas
MONGO_URL=mongodb://127.0.0.1:27017/mern-starter
DRIVER_MONGO_URL=mongodb://127.0.0.1:27017/mern-starter
WORK_DIR=./upload
PREFILL_DB=2
MINIO_URL=play.minio.io
MINIO_PORT=9000
MINIO_ACCESS_KEY=Q3AM3UQ867SPQQA43P2F
MINIO_SECRET_KEY=zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG
MINIO_BUCKET=upload
```

Meaning:

- ``PORT``: server port; default: 8000;
- ``SCHEMAS_DIR``: folder path (example [here](./Pellenberg_schemas)) containing the JSONSchema descriptors for the database models;
- ``MONGO_URL``: Mongo database for non-forms data in the format ``"mongodb://<user>:<password>@<url>:<port>/<dbname>"`
- ``DRIVER_MONGO_URL``: Mongo database for forms in the format ``"mongodb://<user>:<password>@<url>:<port>/<dbname>"`
- ``WORK_DIR``: directory for data uploads (submissions + files); default: ``./upload``;
- ``PREFILL_DB``: ìf 0, it will not touch the db; if 1, it will fill with fictitious data the ``forms`` collections; if 2, it will fill with fictitious data all collections (but ``subms``); default: 1. Value 1 is suggested for production, to have no static entities, but ready-made form templates. Value 2 is suggested for development.
- ``MINIO_URL``: MinIO url for blobs storage;
- ``MINIO_PORT``: MinIO port;
- ``MINIO_ACCESS_KEY``: MinIO access key;
- ``MINIO_SECRET_KEY``: MinIO secret key;
- ``MINIO_BUCKET``: MinIO buekct name where to upload blobs;

*Note*: both build and runtime variables can also be defined in an ``env`` file in the app root folder.

Run:
```
npm start
```

All together (clean dist - build all - run):
```
npm run bs
```

### For development:

As above:
- install dependencies
- set build and runtime environment varibles

Run in development mode:

```
npm run start:choki
```
