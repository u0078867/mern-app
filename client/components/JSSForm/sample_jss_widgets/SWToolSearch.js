import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import AttributesViewer from './components/AttributesViewer';
import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';
import callApi from 'CLIENT_UTIL/apiCaller';

import styles from './ComponentSearch.css';

class SWToolSearchOption extends Component {

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
        {/*<div><b>CUID:</b> {this.props.option.cuid}</div>
        <div><b>Name:</b> {this.props.option.name}</div>
        <div><b>Version:</b> {this.props.option.version}</div>
        <div><b>Producer:</b> {this.props.option.producer}</div>
        <div><b>Uri:</b> {this.props.option.uri}</div>*/}
        <AttributesViewer item={this.props.option} />
      </div>
    );
  }

}

class SWToolSearchValue extends Component {

  render() {
    return (
      <div className={styles["Select-value-fit"]}>
        <span className="Select-value-label">
          {/*<b>{this.props.value.cuid}</b>*/}
          <AttributesViewer item={this.props.value} />
        </span>
      </div>
    );
  }

}

class SWToolSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    let cuid = props.value;
    callApi(`swtools/${cuid}`).then(res => {
      let value = res.item;
      if (!value) {
        value = {cuid};
      }
      if (this.refs.container)
        this.setState({ value: value });
    });
  }

  getSWTools = (input) => {
		if (!input) {
			return Promise.resolve({ options: [] });
		}
    return callSearchApi('swtools', input).then(res => {
      return { options: res.items };
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
          loadOptions={this.getSWTools}
          optionComponent={SWToolSearchOption}
          valueComponent={SWToolSearchValue}
          filterOption={(option, filter) => true} // disables local filtering (already performed server-side)
        />
      </div>
    );
  }
}

SWToolSearch.propTypes = {
};

export default SWToolSearch;
