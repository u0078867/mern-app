
import React, { PropTypes, Component } from 'react';

import TooltipViewer from '../TooltipViewer';

import PublicationViewer from './PublicationViewer';

import callApi from 'CLIENT_UTIL/apiCaller';


class PublicationInlineViewer extends Component {

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
    let formKey = 'insert-update-publication';
    let form;
    if (formKey) {
      form = forms.find(form => form.key == formKey);
      this.setState({ form });
    }
  }

  getDetails = (id) => {
    return callApi(`publications/${id}`)
    .then(res => {
      return (
        <PublicationViewer item={res.item} forms={this.props.forms} />
      );
    });
  }

  render() {
    let { item: d, forms } = this.props;
    let form = this.state.form;
    let schema = form ? form.json_schema : undefined;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.title ? `${d.title}` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default PublicationInlineViewer;
