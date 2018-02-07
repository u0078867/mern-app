### Forms usage:

You can manipulate forms inside the `Forms` tab.

##### Forms creation:

By clicking on ``Add form``, the user can create ``Forms`` by defining **what** fields to show (``Form JSON Schema``), **how** (``Form UI Schema``), and how to **initialize** the form (``Form initial data``); all this is available out-of-the box thanks to the graceful [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form) library :+1:.

``Form JSON Schema`` is the JSON schema of the form, while ``Database JSON Schema (read-only)`` is the JSON schema of the data that is accepted before being inserted in the target collection. The form JSON schema **must comply to** the database schema. This double-schema framework was created for use-cases such as this one; suppose you have a ``device`` collection with a string ``type`` field, and you want to create one form per kind of device, without needing to enter the kind of device. You can create two forms ``Insert device X`` and ``Insert device Y``, with the same target collection and master form JSON schema, but different form JSON schema. Then you can add a read-only property to the ``type`` field, and a default value of ``X`` in one form and ``Y`` in the other.

For the ``Form UI Schema``, see an example list of widgets [here](../../components/JSSForm/Pellenberg_jss_widgets/getWidgetsMap.js).

``Target collection`` indicates where the form submission will be inserted. See [here](../../../Pellenberg_schemas/schemas.config.json) for an example list of collection names.

``Submitter`` is a handler to the custom logic after form submission. This is useful to handles cases when form does not corresponds to the target collection schema, or the form data must be splitted into different collections records, etc. A sample list of submitters can be found [here](components/PellenbergSubmitters/getSubmittersMap.js)

If ``Insert on submit`` is checked, the document will be inserted in the target collection after immediate submit or acceptance of later submission. Not having it checked is helpful in cases when the document needs to have further processing before insertion. Use cases:
- a file is uploaded, but its file name string has to be replaced by a path after storing it at some remote object/file storage;
- a file is uploaded, but extraction of meta-data and insertion in some list is necessary before insertion.

``Output variables``: a JSON object defining global variables to be extracted from the form data after the submission. These variables can be used later on as input variables, for instance as initial data of later forms. Example:

```json
{
  "var1": {
    "path": "outputs[0].data[0].value"
  }
}
```

``var1`` will be created by extracting from the form data the information whose path is ``outputs[0].data[0].value``.

Once saved, forms are shown in list, the topmost being the most recently-added form.

##### Forms deletion:

Just click on ``Delete Form`` under the form title.

##### Forms filling:

By clicking one the form title in the list, a form instance will be presented.
