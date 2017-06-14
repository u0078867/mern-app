import React, { Component, PropTypes } from 'react';
import Form from "react-jsonschema-form";

import SubjectSearch from './SubjectSearch';
import RawFileWidget from './RawFileWidget';

const customFields = {};
const customWidgets = {
  "text-subject": SubjectSearch,
  "raw-file": RawFileWidget,
};

class JSSForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form fields={customFields} widgets={customWidgets} {...this.props} />
    );
  }
}

export default JSSForm;
