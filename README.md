### Usage:

##### Form creation:
### Usage:

##### Form creation:

By cliking on ``Add form``, the user can create ``Forms`` by defining **what** fields to show and **how**; all this is available out-of-the box thanks to the graceful [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form) library :+1:.

For the UI schema, these ``string``-type components (``ui:widget`` property) were developed, with searching features:

- ``researcher``
- ``subjects``
- ``device``
- ``software``
- ``file`` (\*)
- ``output``

(\*) For this widget to work properly, ``WORK_DIR`` environment variable must be set to point to an existing path. Every time a file widget is used (either in the preview part of the form editor, in the form instance or in a submission), the file is uploaded in that folder.

``Target collection`` indicates where the form submission will be inserted.

If ``Insert on submit`` is checked, the document will be inserted in the target collection after imemdiate submit or acceptance of later submission. Not having it checked is helpful in cases when the document needs to have further processing before insertion. Use cases:
- a file is uploaded, but its file name string has to be replaced by a path after storing it at some remote object/file storage;
- a file is uploaded, but extraction of meta-data and insertion in some list is necessary before insertion.

Initial form data will be presented when using the form later.

Once saved, forms are shown in list, the topmost being the most recently-added form.

##### Form usage:

By clicking one the form title in the list, a form instance will be presented.

After filling it, the user can submit it immediately (no chance to be able to edit the content later on!), or submit it for later check. If the second option is taken, the form content will be added in the ``Submissions`` list. Submissions are listed in chronological order, topmost being the oldest.

A submission can be changed and saved an unlimited number of times (by clinking on it and saving it), but definitely submitted only once. Saving a submission will not change the time of its creation.

When accepting a submission, a JSON file will be created in the ``WORK_DIR`` folder.

##### RESTful APIs:

The following APIs are available:

###### /api/\<entities>:
* ``GET``: it will get a list of all entities. Entities string can be: ``researchers``, ``subjects``, ``devices``, ``sw-tools``, ``outputs``, ``forms``, ``subms``.
* ``POST``: it will create a new entity; request body must be a JSON object containing the entity name (same as above but without final 's') as a field, and this one should be an object whose schema is indicated in Data models.

###### /api/\<entities>/\<cuid>:
* ``GET``: it will get the information about one entity with specific ``cuid``.
* ``PUT`` (only for ``forms`` and ``subms``): it will replace it; see ``POST`` request.
* ``DELETE`` (only for ``forms`` and ``subms``): it will delete it.

See above for the list of available entities.

###### /api/database/collections:
Gets information about the collections.

###### /search-api/\<entities>?q=\<terms>:
It searches for entities by using full-text and partial-text search (Mongo engine is used for this). For full-text search, all indexable string documents (sub)fields are used. For partial-text search, only the required fields of data models are used. For partial-text search, only tokenized terms that are longer or equal than 3 characters are considered, to limit the amount of results.

For further details, see Data models.

See above for the list of available entities (``forms`` and ``subms`` are not allowed here).

##### WAMP services:

These services are available:

- ``WAMP connection``: it allows to connect to a [WAMP](http://crossbar.io/) router and, via ports, publish/subscribe to contents within the app, eveywhere.
- ``Work-flow client``: when activated, a publishing of specific messages on the listened port will trigger a redirect to a specific form to fill. This is useful when form presentation has to be automatized, for instance bit a workflow engine.

*(to add many details)*


### Data models:

See [here](server/app/models/README.md).


### Installation (production):

Install dependencies:
```
$ npm install
```
Build:
```
$ npm run build:server
```
```
$ npm run build:client
```
Deploy - set environment variables:

- ``MONGO_URL``: ``"mongodb://<user>:<password>@<url>:<port>/<dbname>"``;
- ``PORT``: server port; default: 8000;
- ``WORK_DIR``: directory for data uploads (submissions + files); default: ``./upload``;
- ``PREFILL_DB``: ìf 0, it will not touch the db; if 1, it will fill with fictitious data the ``forms`` collections; if 2, it will fill with fictitious data all collections (but ``subms``); default: 1;

Deploy - run:
```
$ npm start
```


### Boilerplate:

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


### Playground deployment on Heroku:

It is possible to play with the app here: https://intense-hollows-60910.herokuapp.com

The MongoDB used is the sandboxed free version at [mLab](https://mlab.com/).

Data inside is totally fictitious.

The following features are **broken** on Heroku at the moment:

- the searching feature for the form ``output`` component; this is due to the fact that at the moment (see [here](http://docs.mlab.com/ops/#available-versions)) the current MongoDB version at mLab is 3.2 for sandboxed versions. The search query used here uses the following pipeline stages only supported from MongoDB 3.4 on: ``$addFields``, ``$graphLookup``, ``$replaceRoot``.
