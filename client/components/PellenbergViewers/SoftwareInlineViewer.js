
import React, { PropTypes, Component } from 'react';

import TooltipViewer from './TooltipViewer';

import SoftwareViewer from './SoftwareViewer';

import callApi from 'CLIENT_UTIL/apiCaller';


class SoftwareInlineViewer extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
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
    let { item: d } = this.props;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.name ? `${d.name} (${d.version})` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default SoftwareInlineViewer;
