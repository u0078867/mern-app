
import React, { PropTypes, Component } from 'react';

import TooltipViewer from '../TooltipViewer';

import SubjectViewer from './SubjectViewer';

import callApi from 'CLIENT_UTIL/apiCaller';


class SubjectInlineViewer extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
  }

  getDetails = (id) => {
    return callApi(`subjects/${id}`)
    .then(res => {
      return (
        <SubjectViewer item={res.item} forms={this.props.forms} />
      );
    });
  }

  render() {
    let { item: d } = this.props;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.hospital_id ? `${d.hospital_id}` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default SubjectInlineViewer;
