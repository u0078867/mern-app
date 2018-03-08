
import React, { PropTypes, Component } from 'react';

import TooltipViewer from '../TooltipViewer';

import SoftwareViewer from './SoftwareViewer';

import callApi from 'CLIENT_UTIL/apiCaller';

import { extractOptionTitle } from '../utils/formJSONDataExtract';


class SoftwareInlineViewer extends Component {

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
    let formKey = 'insert-update-software';
    let form;
    if (formKey) {
      form = forms.find(form => form.key == formKey);
      this.setState({ form });
    }
  }

  getDetails = (id) => {
    return callApi(`swtools/${id}`)
    .then(res => {
      return (
        <SoftwareViewer item={res.item} forms={this.props.forms} />
      );
    });
  }

  render() {
    let { item: d, forms } = this.props;
    let form = this.state.form;
    let schema = form ? form.json_schema : undefined;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.name ? `${d.name} (${d.version})` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default SoftwareInlineViewer;
