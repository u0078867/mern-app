
import React, { PropTypes, Component } from 'react';

import TooltipViewer from '../TooltipViewer';

import DeviceViewer from './DeviceViewer';

import callApi from 'CLIENT_UTIL/apiCaller';

import {
  extractOptionTitle,
  titleizeAttribute
} from '../utils/formJSONDataExtract';

import { getFormKeyFromDeviceFunction } from './utils';


class DeviceInlineViewer extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.state = {
      form: null,
    };
  }

  componentDidMount() {
    let d = this.props.item;
    let forms = this.props.forms;
    let formKey;
    if (d.functions) {
      formKey = getFormKeyFromDeviceFunction(d.functions[0]);
    }
    let form;
    if (formKey) {
      form = forms.find(form => form.key == formKey);
      this.setState({ form });
    }
  }

  getDetails = (id) => {
    return callApi(`devices/${id}`)
    .then(res => {
      return (
        <DeviceViewer item={res.item} forms={this.props.forms} />
      );
    });
  }

  render() {
    let { item: d } = this.props;
    let form = this.state.form;
    let schema = form ? form.json_schema : undefined;
    let producer = schema ? extractOptionTitle(schema.properties.producer.anyOf, d.producer) : d.producer;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.name ? `${d.name} (${d.producer})` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default DeviceInlineViewer;
