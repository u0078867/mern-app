import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import callSearchApi from '../../util/apiSearchCaller';
import callApi from '../../util/apiCaller';

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
        <div>
          {`${this.props.option.company} ${this.props.option.name} ${this.props.option.version} `}<br/>
          <i>({this.props.option.download_uri})</i>
        </div>
      </div>
    );
  }

}

class SWToolSearchValue extends Component {

  render() {
    return (
      <div className="Select-value">
        <span className="Select-value-label">
          {`${this.props.value.company} ${this.props.value.name} ${this.props.value.version} `}
          <b>({this.props.value.cuid})</b>
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
    callApi(`sw-tools/${cuid}`).then(res => {
      let value = res.SWTool;
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
    return callSearchApi('sw-tools', input).then(res => {
      return { options: res.SWTools };
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
