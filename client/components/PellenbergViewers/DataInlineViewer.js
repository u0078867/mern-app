
import React, { PropTypes, Component } from 'react';

import TooltipViewer from './TooltipViewer';

import OutputContent from './OutputContent';

import callApi from 'CLIENT_UTIL/apiCaller';


class DataInlineViewer extends Component {

  static defaultProps = {

  };

  constructor(props) {
    super(props);
  }

  getDetails = (id) => {
    return callApi(`outputs/${id}`)
    .then(res => {
      return (
        <OutputContent item={res.item} forms={this.props.forms} />
      );
    });
  }

  render() {
    let { item: d } = this.props;
    return (
      <TooltipViewer onContent={() => this.getDetails(d.cuid)} >
        {d.name ? `${d.name}` : 'Click for details'}
      </TooltipViewer>
    )
  }
}

export default DataInlineViewer;
