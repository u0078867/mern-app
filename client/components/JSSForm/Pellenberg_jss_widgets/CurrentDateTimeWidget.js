import React, { Component, PropTypes } from 'react';
import AltDateTimeWidget from "react-jsonschema-form/lib/components/widgets/AltDateTimeWidget";


class CurrentDateTimeWidget extends Component {

  constructor(props) {
    super(props);
    this.interval = null;
  }

  componentDidMount = () => {
    //this._setInterval();
  }

  componentWillUnmount = () => {
    this._clearInterval();
  }

  _setInterval = () => {
    if (!this.interval) {
      this.interval = setInterval(() => {
        let datetime = new Date().toISOString();
        this.props.onChange(datetime);
      }, 1000);
    }
  }

  _clearInterval = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.props.onChange(undefined);
      this.interval = null;
    }
  }

  onClick = (event) => {
    event.stopPropagation();
    let button = event.target.innerHTML;
    switch (button) {
      case 'Now':
        this._setInterval();
        break;
      case 'Clear':
        this._clearInterval();
        break;
    }
  }

  render() {
    return (
      <div onClick={this.onClick}>
        <AltDateTimeWidget {...this.props} />
      </div>
    );
  }
}


export default CurrentDateTimeWidget;
