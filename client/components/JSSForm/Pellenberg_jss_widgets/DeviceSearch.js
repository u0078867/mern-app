import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import AttributesViewer from './components/AttributesViewer';
import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';
import callApi from 'CLIENT_UTIL/apiCaller';

import pubsub from 'pubsub-js';

import styles from './ComponentSearch.css';


class DeviceSearchOption extends Component {

  handleMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
		//this.props.onSelect(this.props.option, event);
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
        {/*<div><b>CUID:</b> {this.props.option.cuid}</div>
        <div><b>Name:</b> {this.props.option.name}</div>
        <div><b>Type:</b> {this.props.option.type}</div>
        <div><b>Producer:</b> {this.props.option.producer}</div>
        <div><b>Uri:</b> {this.props.option.uri}</div>*/}
        <AttributesViewer item={this.props.option} />
      </div>
    );
  }

}

class DeviceSearchValue extends Component {

  render() {
    return (
      <div className={styles["select-value"]}>
        <AttributesViewer item={this.props.value} />
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

    /*setTimeout(() => {
      try {
        let msg = JSON.parse(JSON.stringify(this.props.options.events.timeout));
        msg.targets.formData.payload = "random string";
        pubsub.publishSync('jss-internals', msg);
      } catch (e) {}
    }, 2000);*/
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    let cuid = props.value;
    callApi(`devices/${cuid}`).then(res => {
      let value = res.item;
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
      return { options: res.items };
    });
	}

  onChange = (value) => {
    if (value) {
      this.props.onChange(value.cuid);
    } else {
      this.props.onChange(undefined);
    }
  }

  render() {
    return (
      <div ref="container">
        <Select.Async
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
