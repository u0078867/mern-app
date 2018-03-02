
import React, { PropTypes, Component } from 'react';

import TooltipViewer from '../TooltipViewer';

import ResearcherViewer from './ResearcherViewer';

import callApi from 'CLIENT_UTIL/apiCaller';


class ResearcherInlineViewer extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
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
    let { item: d } = this.props;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.name ? `${d.name} ${d.surname}` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default ResearcherInlineViewer;
