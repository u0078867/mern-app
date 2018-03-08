
import React, { PropTypes, Component } from 'react';

import TooltipViewer from '../TooltipViewer';

import ProjectViewer from './ProjectViewer';

import callApi from 'CLIENT_UTIL/apiCaller';


class ProjectInlineViewer extends Component {

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
    let formKey = 'insert-update-project';
    let form;
    if (formKey) {
      form = forms.find(form => form.key == formKey);
      this.setState({ form });
    }
  }

  getDetails = (id) => {
    return callApi(`projects/${id}`)
    .then(res => {
      return (
        <ProjectViewer item={res.item} forms={this.props.forms} />
      );
    });
  }

  render() {
    let { item: d } = this.props;
    let form = this.state.form;
    let schema = form ? form.json_schema : undefined;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.name ? `${d.name} (${d.begin_period} - ${d.end_period})` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default ProjectInlineViewer;
