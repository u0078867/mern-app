import React, { Component, PropTypes } from 'react';
import Form from "react-jsonschema-form";
import { renderToString } from 'react-dom/server';
import { getWidgetsMap, getFieldsMap, getContainersMap } from 'JSS_WIDGETS_PATH';


import pubsub from 'pubsub-js';

import callApi from '../../util/apiCaller';

// Get custom widgets
const customWidgets = getWidgetsMap();

// Get custom fields
const customFields = getFieldsMap();

// Get custom containers
const customContainers = getContainersMap();

class JSSForm extends Component {

  static defaultProps = {
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
      schema: undefined,
      uiSchema: undefined,
      formData: undefined,
    }
  }

  componentDidMount = () => {
    let formProps = {
      schema: this.props.schema,
      uiSchema: this.props.uiSchema,
      formData: this.props.formData,
    }
    this._update(formProps);
    this._listenToInternalEvents(this.props.listenToInternalEvents);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.schema != this.props.schema || nextProps.uiSchema != this.props.uiSchema || nextProps.formData != this.props.formData) {
      let formProps = {
        schema: nextProps.schema,
        uiSchema: nextProps.uiSchema,
        formData: nextProps.formData,
      }
      this._update(formProps);
    }
    if (nextProps.inRefresh) {
      this.setState({ valid: false }, () => {
        this.props.postRefreshCallback();
      })
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
    let schema_ = schema;
    let uiSchema_ = uiSchema;
    let formData_ = formData;
    /*console.log(schema_)
    console.log(uiSchema_)
    console.log(formData_)*/
    if (schema == undefined || uiSchema == undefined || formData == undefined) { // proper form invalidation
      schema_ = undefined;
      uiSchema_ = undefined;
      //formData_ = undefined;
    }
    let valid = true;
    try {
      let formContext = this.props.formContext;
      formContext.containers = customContainers;
      const test = renderToString(  // done only to catch render() exceptions in Form
        <Form
          fields={customFields}
          widgets={customWidgets}
          schema={schema_}
          uiSchema={uiSchema_}
          formData={formData_}
          formContext={formContext}
        />
      );
      if (/unsupported/i.test(test))
        throw new Error(test);
    } catch (err) {
      console.log(err);
      valid = false;
    }
    this.props.onFormPropsChange({valid});
    if (valid) {
      this.setState({
        valid: true,
        schema: schema_,
        uiSchema: uiSchema_,
        formData: formData_,
      });
    } else {
      this.setState({
        valid: false,
        formData: formData_,
      });
    }
  };

  render() {
    var form = null;
    let {schema, uiSchema, formData, formContext, ...props} = this.props;
    formContext.containers = customContainers; // containers concept is not in registry, so haev to use formContext

    var form = <pre>{JSON.stringify(this.state.formData, null, 2)}</pre>;
    if (this.state.valid) {
      var form = (<Form
                fields={customFields}
                widgets={customWidgets}
                schema={this.state.schema}
                uiSchema={this.state.uiSchema}
                formData={this.state.formData}
                formContext={formContext}
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
