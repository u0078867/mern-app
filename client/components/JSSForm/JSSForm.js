import React, { Component, PropTypes } from 'react';
import Form from "react-jsonschema-form";
import { renderToString } from 'react-dom/server';

import ResearcherSearch from './ResearcherSearch';
import SubjectSearch from './SubjectSearch';
import DeviceSearch from './DeviceSearch';
import SWToolSearch from './SWToolSearch';
import RawFileWidget from './RawFileWidget';
import OutputSearch from './OutputSearch';

import pubsub from 'pubsub-js';


const customFields = {};
const customWidgets = {
  "researcher": ResearcherSearch,
  "subject": SubjectSearch,
  "device": DeviceSearch,
  "software": SWToolSearch,
  "file": RawFileWidget,
  "output": OutputSearch,
};

class JSSForm extends Component {

  static defaultProps = {
    valid: false,
    schema: undefined,
    uiSchema: undefined,
    formData: undefined,
    listenToInternalEvents: false,
    onFormPropsChange: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      valid: false,
      schema: props.schema,
      uiSchema: props.uiSchema,
      formData: props.formData,
    }
  }

  componentDidMount = () => {
    this._update(this.state);
    this._listenToInternalEvents(this.props.listenToInternalEvents);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.schema != this.props.schema || nextProps.uiSchema != this.props.uiSchema || nextProps.formData != this.props.formData) {
      this._update(nextProps);
    }
    this._listenToInternalEvents(nextProps.listenToInternalEvents);
  }

  _listenToInternalEvents = (listen) => {
    if (listen) {
      pubsub.subscribe('jss-internals', (msg, data) => {
        if ('formData' in data.targets) {
          let formData = Object.assign({}, this.state.formData);
          let jsonPath = data.targets.formData.path;
          formData[jsonPath] = data.targets.formData.payload;
          this.setState({
            formData,
          })
        }
      })
    }
  }

  _update = (formProps) => {
    let {schema, uiSchema, formData} = formProps;
    let valid = true;
    try {
      const test = renderToString(
        <Form
          fields={customFields}
          widgets={customWidgets}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
        />
      );
      if (/unsupported/i.test(test))
        throw new Error(test);
    } catch (err) {
      //console.log(err);
      valid = false;
    }
    this.props.onFormPropsChange({valid});
    if (valid) {
      this.setState({
        valid: true,
        schema: schema,
        uiSchema:uiSchema,
        formData: formData,
      });
    } else {
      this.setState({
        valid: false
      });
    }
  };

  render() {
    var form = null;
    let {schema, uiSchema, formData, ...props} = this.props;
    if (this.state.valid) {
      var form = (<Form
                fields={customFields}
                widgets={customWidgets}
                schema={this.state.schema}
                uiSchema={this.state.uiSchema}
                formData={this.state.formData}
                ref="form"
                {...props}
              />)
    }
    return (
      <div>
        <p>Form definition: {this.state.valid ? "valid" : "invalid"}</p>
        {form}
      </div>
    )
  }

}

export default JSSForm;
