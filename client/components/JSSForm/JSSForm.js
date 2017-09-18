import React, { Component, PropTypes } from 'react';
import Form from "react-jsonschema-form";
import { renderToString } from 'react-dom/server';
import { getWidgetsMap } from 'JSS_WIDGETS_PATH';
//import LayoutField from 'react-jsonschema-form-layout';
import LayoutField from './LayoutField';


import pubsub from 'pubsub-js';

import callApi from '../../util/apiCaller';

// Get custom widgets
const customWidgets = getWidgetsMap();

// Get custom fields
const customFields = {
  layout: LayoutField,
}

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
    // convert super-schema to JSONSchema-compliant
    if (this.props.schema != undefined) {
      callApi('utils/staticize-json-schema', 'post', {
        schema: this.props.schema
      })
      .then(res => {
        console.log(res.schema)
        let formProps = {
          schema: res.schema, // new converted schema
          uiSchema: this.props.uiSchema,
          formData: this.props.formData,
        }
        this._update(formProps);
      })
    } else {
      let formProps = {
        schema: undefined,
        uiSchema: this.props.uiSchema,
        formData: this.props.formData,
      }
      this._update(formProps);
    }
    this._listenToInternalEvents(this.props.listenToInternalEvents);
  }

  componentWillReceiveProps (nextProps) {
    /*console.log(nextProps.schema != this.props.schema);
    console.log(nextProps.uiSchema != this.props.uiSchema);
    console.log(nextProps.formData != this.props.formData);*/
    if (nextProps.schema != this.props.schema || nextProps.uiSchema != this.props.uiSchema || nextProps.formData != this.props.formData) {
      if (nextProps.schema != this.props.schema) {
        if (nextProps.schema != undefined) {
          // schema changed, re-convert it super-schema to JSONSchema-compliant
          callApi('utils/staticize-json-schema', 'post', {
            schema: nextProps.schema
          })
          .then(res => {
            console.log("converted")
            console.log(res.schema)
            let formProps = {
              schema: res.schema, // new converted schema
              uiSchema: this.props.uiSchema,
              formData: this.props.formData,
            }
            this._update(formProps);
          });
        } else {
          let formProps = {
            schema: undefined,
            uiSchema: nextProps.uiSchema,
            formData: nextProps.formData,
          }
          this._update(formProps);
        }
      } else {
        // schema did not change, use the old one (already converted), and use new uiSchema and data
        let formProps = {
          schema: this.state.schema, // old converted schema
          uiSchema: nextProps.uiSchema,
          formData: nextProps.formData,
        }
        this._update(formProps);
      }

    }

    if (nextProps.inRefresh) {
      // refresh wanted, re-convert it super-schema to JSONSchema-compliant
      console.log('refreshing ...');
      callApi('utils/staticize-json-schema', 'post', {
        schema: nextProps.schema
      })
      .then(res => {
        console.log("converted")
        console.log(res.schema)
        let formProps = {
          schema: res.schema, // new converted schema
          uiSchema: this.props.uiSchema,
          formData: this.props.formData,
        }
        this._update(formProps);
        this.props.postRefreshCallback();
      });
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
    if (schema == undefined || uiSchema == undefined || formData == undefined) { // proper form invalidation
      schema_ = undefined;
      uiSchema_ = undefined;
    }
    let valid = true;
    try {
      const test = renderToString(  // done only to catch render() exceptions in Form
        <Form
          fields={customFields}
          widgets={customWidgets}
          schema={schema_}
          uiSchema={uiSchema_}
          formData={formData_}
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
    let {schema, uiSchema, formData, ...props} = this.props;
    //console.log(this.state.schema)

    var form = <pre>{JSON.stringify(this.state.formData, null, 2)}</pre>;
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
