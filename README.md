This project bundles the different UI & UX design and development for the BioMech labs.

#### User interfaces for activities logging

Such interfaces are needed to log activities, that is insertion of metadata (with linked data).

They would be used in the following phases:

- measurements execution;
- measurements processing;

Ideally, these tools:

- should not be cumbersome and time-consuming for the user, since from my experience, time allocated for each action during a measurement is already limited, especially if pathological children are involved; many form fields would consist of advanced type-ahead features;
- should involve forms that are easily customizable; automatic form generation from JSON Schema seems to fit quite well in this; this would also accomodate for an easier activity metadata model change;
- should, for new-comers, provide guidance of forms to compile, as a predefined sequence; for this, a BPMN engine, such as the one we have been experimenting jBPM, might do;
- should allow for a post-measurement check of the form content before a final submit, since hurry during measurement could generate human mistakes;
- for developers, the interface should be implemented with technologies that allow highest customization: HTML5 and JS. For develoment, I give my personal preference to React / Redux, with respect to Angular where I have found in my experience issues with response time and higher complexity in data flows;
- should be centralized, so that it is ensured that all users are using the same version of the services;

Based on the boilerplate [MERN](http://mern.io), I am experimenting with forms creation from JSON Schema and one of its implementation with React using [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form). This, along with a JSON schema (what), allows for the creation of an UI schema (how) and the initial form data.