import React, { Component, PropTypes } from 'react';

import { Panel } from 'react-bootstrap';


class CollapsibleViewer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
    }
  }

  onSelect = () => {
    this.setState({ hidden: !this.state.hidden})
  }


  render() {
    let { hidden, ...state } = this.state;
    let command = hidden ? 'Show' : 'Hide';
    return (
      <Panel collapsible header={`${command} ${this.props.options.title}`} onSelect={this.onSelect}>
        {this.props.children}
      </Panel>
    );
  }
}


export default CollapsibleViewer;
