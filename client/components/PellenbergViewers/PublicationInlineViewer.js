
import React, { PropTypes, Component } from 'react';

import TooltipViewer from './TooltipViewer';

import PublicationViewer from './PublicationViewer';

import callApi from 'CLIENT_UTIL/apiCaller';


class PublicationInlineViewer extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
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
    let { item: d } = this.props;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.title ? `${d.title}` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default PublicationInlineViewer;
