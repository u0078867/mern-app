import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import callSearchApi from '../../util/apiSearchCaller';
import callApi from '../../util/apiCaller';

import pubsub from 'pubsub-js';


class DeviceSearchOption extends Component {

  handleMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		this.props.onSelect(this.props.option, event);
	}

	handleMouseEnter = (event) => {
		this.props.onFocus(this.props.option, event);
	}

	handleMouseMove = (event) => {
		if (this.props.isFocused) return;
		this.props.onFocus(this.props.option, event);
	}

  render() {
    return (
      <div
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
      >
        <div>
          {this.props.option.name + ' '}
          <i>({this.props.option.type})</i>
        </div>
      </div>
    );
  }

}

class DeviceSearchValue extends Component {

  render() {
    return (
      <div className="Select-value">
        <span className="Select-value-label">
          {this.props.value.name + ' '}
          <b>({this.props.value.cuid})</b>
        </span>
      </div>
    );
  }

}

class DeviceSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {

    setTimeout(() => {
      try {
        let msg = JSON.parse(JSON.stringify(this.props.options.events.timeout));
        msg.targets.formData.payload = "random string";
        pubsub.publishSync('jss-internals', msg);
      } catch (e) {}
    }, 2000);

    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    let cuid = props.value;
    callApi(`devices/${cuid}`).then(res => {
      let value = res.device;
      if (!value) {
        value = {cuid};
      }
      if (this.refs.container)
        this.setState({ value: value });
    });
  }

  getDevices = (input) => {
		if (!input) {
			return Promise.resolve({ options: [] });
		}
    return callSearchApi('devices', input).then(res => {
      return { options: res.devices };
    });
	}

  onChange = (value) => {;
      this.props.onChange(value.cuid);
  }

  render() {
    return (
      <div ref="container">
        <Select.AsyncCreatable
          value={this.state.value}
          onChange={this.onChange}
          valueKey="cuid" // necessary for right options navigation
          loadOptions={this.getDevices}
          optionComponent={DeviceSearchOption}
          valueComponent={DeviceSearchValue}
          filterOption={(option, filter) => true} // disables local filtering (already performed server-side)
        />
      </div>
    );
  }
}

DeviceSearch.propTypes = {
};

export default DeviceSearch;
