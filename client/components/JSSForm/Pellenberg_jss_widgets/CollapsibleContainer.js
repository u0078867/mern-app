import React, { Component, PropTypes } from 'react';

import HelpPanel from './HelpPanel';


class CollapsibleContainer extends Component {

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
    return (<div>
      <HelpPanel header={`${command} ${this.props.options.title}`} toggleExpand={this.onSelect}>
        {this.props.children}
      </HelpPanel></div>
    );
  }
}


export default CollapsibleContainer;
