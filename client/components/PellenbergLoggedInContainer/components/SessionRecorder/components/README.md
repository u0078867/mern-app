This component allows to store the history of events in a certain time window.

### Usage:

##### Type of recorded events:

At the moment, the following events are recorded:
- form submission;

##### Record session:

The session can be given a name and enabled external triggers to start recording or not. At the moment, these triggers are provided by the workflow engine. It is also possible to start or stop recording manually, by using the record/stop button. The number of events recorded is indicated in ``Events recorded``.

##### Generated session file:

After stopping recording, the session events file is downloadable by a generated link.
The session file has the following shape:

```json
{
  "file_version": 1,
  "session_name": "test",
  "events": [
    ...
    {
      "type": "form_submission",
      "received_by": "direct_submitter",
      "form": {
        "title": "form title",
        "key": "form key"
      },
      "stored_record": {
      ...
    },
    ...
    {
      "type": "form_submission",
      "received_by": "wf_variables_submitter",
      "form": {
        "title": "form title",
        "key": "form key"
      },
      "form_data": {
      ...
    },
    ...
  ]
}
```

In general, the every the event object is defined by the submitter.

##### Replay session file:

You can load a session file in ``Load JSON file with session content`` anytime, and when playing it, the first event will be shown (e.g. the form with its associated data). It is always possible to move along the events timeline by using the left and rights arrows.
