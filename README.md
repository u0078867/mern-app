### Usage:

The user can create ``Forms`` by defining **what** fields to show and **how**; all this is available out-of-the box thanks to the graceful [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form) library :+1:.

For the UI schema, these ``string`` type components (widgets) were developed, with searching features:

- ``researcher``
- ``subjects``
- ``device``
- ``software``
- ``file``
- ``output``

By clicking one the form title in the list of created ones, a form instance will be presented.

After filling it, the user can submit it immediately (no chance to be able to edit the content later on), or submit it for later check. If the second option is taken, the form content will be added a in the ``Submissions`` list.

A submission can be changed and saved an unlimited number of times, but definitely submitted only once.

These services are available:

- ``WAMP connection``: it allows to connect to a [WAMP](http://crossbar.io/) router and, via ports, publish/subscribe to contents within the app, eveywhere.
- ``Work-flow client``: when activated, a publishing of specific messages on the listened port will trigger a redirect to a specific form to fill. This is useful when form presentation has to be automatized, for instance bit a workflow engine.

*(to add many details)*


### Boilerplate:

The application was developed on top of the [mern.io](http://mern.io/) 2.0 boilerplate.

The following updates where applied:

- in dev mode, server watching service was replaced by chokidar (see [here](https://medium.com/@kevinsimper/dont-use-nodemon-there-are-better-ways-fc016b50b45e)); nodemon modality was kept anyway for historical reasons.
- packages in ``package.json`` are better distributed between ``dependencies`` and ``devDependencies``.
- ``webpack.conf`` files were upgraded to smoothly load ``bootstrap`` assets.
- ``webpack.conf`` files were upgraded to hide warnings related to ``autobahn.js``.
- better management of resources to load (both client and server) by using ``process.env.NODE_ENV``.
- ``App`` does not run actions related to other modules (e.g. ``addPost()``), these have to be contained in the related modules; this for achieving better modularity and decoupling.
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
