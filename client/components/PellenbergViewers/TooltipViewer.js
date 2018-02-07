
import React, { PropTypes, Component } from 'react';

import {
  Tooltip,
  Popover,
  OverlayTrigger,
} from 'react-bootstrap';


require('./TooltipViewer.css');


class TooltipViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: null,
    }
  }

  onEntering = (e) => {
    this.props.onContent()
    .then(content => {
      this.setState({ content });
    })
  }

  render() {
    let Viewer = this.props.viewer;
    let forms = this.props.forms;
    let content = this.state.content;
    let tooltip = (
      <Popover id="tooltip-summary">
        {content || 'loading ...'}
      </Popover>
    )
    return (
      <OverlayTrigger
        overlay={tooltip}
        placement="bottom"
        delayShow={300}
        delayHide={150}
        onEntering={this.onEntering}
        trigger={["click","focus"]}
      >
        <a style={{cursor: "pointer"}}>{this.props.children}</a>
      </OverlayTrigger>
    )

  }

}

export default TooltipViewer;
