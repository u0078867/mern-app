
import React, { PropTypes, Component } from 'react';

import TooltipViewer from '../TooltipViewer';

import ResearcherViewer from './ResearcherViewer';

import callApi from 'CLIENT_UTIL/apiCaller';


class ResearcherInlineViewer extends Component {

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
    let formKey = 'insert-update-researcher';
    let form;
    if (formKey) {
      form = forms.find(form => form.key == formKey);
      this.setState({ form });
    }
  }

  getDetails = (id) => {
    return callApi(`researchers/${id}`)
    .then(res => {
      return (
        <ResearcherViewer item={res.item} forms={this.props.forms} />
      );
    });
  }

  render() {
    let { item: d, forms } = this.props;
    let form = this.state.form;
    let schema = form ? form.json_schema : undefined;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.name ? `${d.name} ${d.surname}` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default ResearcherInlineViewer;
