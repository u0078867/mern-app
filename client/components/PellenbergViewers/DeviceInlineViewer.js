
import React, { PropTypes, Component } from 'react';

import TooltipViewer from './TooltipViewer';

import DeviceViewer from './DeviceViewer';

import callApi from 'CLIENT_UTIL/apiCaller';


class DeviceInlineViewer extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
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
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.name ? `${d.name} (${d.producer})` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default DeviceInlineViewer;
