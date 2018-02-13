### Introduction:

At its core, the server app has the following capabilities:
- connect to a generic experimental data DB and provide a DB-agnostic data model;
- server-side render React components based on routes (multi-page app);
- a core RESTful API to manage forms and files uploads, and other utilities;
- possibility the plug a custom API to manage the experimental data;

### Experimental database connection:

By using [osmos](https://github.com/u0078867/osmos-lite) drivers, the app is able to connect to perform CRUD operations to any database, provided that the specific driver is implemented (see [here](buildOsmosDriver.js)). More specifically, osmos needs a ``JSONSchema`` definition for every collection of the database, in order to validate data for read/write operations. This also helps avoiding to write data with wrong format in the DB. Once ``JSONSchema``s are provided, osmos generates a collection of ``Model``s (see [here](app/models/entity.js)), to be used inside the app and having the CRUD methods.
``JSONSchema``s are defined inside a folder (an example [here](../Pellenberg_schemas)) that must contain a ``schemas.config.json`` file. This is a JSON array containing information for the collections. Every item must have the following properties:
- ``name``: name to be used in the code when getting the model (e.g. ``Models[name]``);
- ``json_schema_file``: name of the ``JSONSchema`` file contained in the same folder;
- ``collection_name``: name of the collection as in the database;
- ``collection_title``: user-friendly name to be used inside the app for presentation purpose;

###### Limitations:

In practice, the osmos ``find()`` method cannot be generalized for any database, since the language for data reading is different for every database.

### Multi-page app:

The application was developed on top of the [mern.io](http://mern.io/) 2.0 boilerplate.
The following updates where applied:

- in dev mode, server watching service was replaced by chokidar (see [here](https://medium.com/@kevinsimper/dont-use-nodemon-there-are-better-ways-fc016b50b45e)); nodemon modality was kept anyway for historical reasons.
- packages in ``package.json`` are better distributed between ``dependencies`` and ``devDependencies``.
- ``webpack.conf`` files were upgraded to smoothly load ``bootstrap`` assets.
- ``webpack.conf`` files were upgraded to hide warnings related to ``autobahn.js``.
- better management of resources to load (both client and server) by using ``process.env.NODE_ENV``.
- ``App`` client module does not run actions related to other modules (e.g. ``addPost()``), these have to be contained in the related modules; this for achieving better modularity and decoupling.
- in ``server/server.js``, removed online assets in page template.
- in ``server/server.js``, fixed [this](https://github.com/Hashnode/mern-starter/issues/149) warning.
- in ``server/server.js``, appended ``.replace(/</g, '\\u003c')`` to ``JSON.stringify(initialState)`` (see [here](http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations)).
- in ``server/app/models`` there is an initial model destroy/reload to work properly with ``chokidar`` files watching.
- ``dist`` folder was excluded from ``.gitignore``; I am aware it is not a best practice, but this fastens deployment to Heroku; solutions like [this](https://coderwall.com/p/ssxp5q/heroku-deployment-without-the-app-being-at-the-repo-root-in-a-subfolder) are broken on Windows git console.
- temporarily disabled pre-commit test hooks, since unfortunately (time ... :weary:) I am not having time to write tests now (debug-during approach).

### Core RESTful API:

API routes can be found [here](app/routes). Details on request/response data is skipped here (please read the code).

Routes for forms:
- ``GET /api/forms``: get all forms;
- ``GET /api/forms/:cuid``: get form with specific CUID;
- ``POST /api/forms``: create a new form;
- ``PUT /api/forms/:cuid``: update form with specific CUID;
- ``DELETE /api/forms/:cuid``: delete form with specific CUID;

Routes for form data upload:
- ``POST /upload/file``: upload a file submitted by a HTML5 form;
- ``POST /upload/data``: insert form data into database;

Routes for database:
- ``GET /database/collections``: get information about collections;

Routes for [MinIO](https://minio.io/) object storage:
- ``GET /minio/presigned-get-url``: get [pre-signed URL](https://docs.minio.io/docs/upload-files-from-browser-using-pre-signed-urls) for downloading an object;
- ``GET /minio/presigned-put-url``: get [pre-signed URL](https://docs.minio.io/docs/upload-files-from-browser-using-pre-signed-urls) for uploading/updating an object;
- ``GET /minio/remove-object``: remove an object from a bucket;

Routes for utilities:
- ``POST /utils/staticize-json-schema``: transform a non-``JSONSchema`` compliant JSON object into a compliant one. The operation that are performed are, in order:
	- replace [mustache](https://github.com/janl/mustache.js/) wrappers with variables content. The variable name is taken from merging profile variables (see ``Profile`` React component), and the ones loaded in the workflow (see ``WorkflowEngine`` React component).
	- parse the whole JSON file and identify objects containing the property: ``__replacer__: true``. This object is the placeholder.
	- if there is a property ``valueFromVar``, replace the placeholder with the current value of the variable;
	- if there is ``query`` property, it must be in the following form: ``api endpoint;GET url string; query parameters``; Example: ``search-api;devices;{{opto_sensor}}``.
	- parse ``select`` to extract the results from the query response. The format is: ``selector type;selector string``. Selector type is at the moment either JSONPath ``jp`` or Lodash ``_``. Example: ``_;items[0].cuid``.
	- A full example of placeholder is the following. It means: set ``id`` as the ``cuid`` of the first result out of the search among devices with the string in the variable ``opto_sensor``.

```json
        "id": {
          "select": "_;items[0].cuid",
          "query": "search-api;devices;{{opto_sensor}}",
          "__replacer__": true
        }
```

### Custom API:

This is normally useful for retrieving data from the database. A good API ecosystem should be like described in [here](http://graphql.org/learn/thinking-in-graphs/#business-logic-layer). Thus, the following layers are advocated:
- ``data services``: the ones communicating directly with the DB;
- ``data loaders``: services for retrieving data, having a cache mechanism and batch processing capabilities (see [here](https://github.com/facebook/dataloader)).
- ``interface layer``: the interface to the user: REST, GraphQL or RPC. Any of these can use data services and data loaders.

An example of custom API can be found [here](./app/Pellenberg_api).
