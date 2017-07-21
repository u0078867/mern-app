import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import callSearchApi from '../../util/apiSearchCaller';
import callApi from '../../util/apiCaller';

class ResearcherSearchOption extends Component {

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
        <div><b>CUID:</b> {this.props.option.cuid}</div>
        <div><b>Name:</b> {this.props.option.name}</div>
        <div><b>Surname:</b> {this.props.option.surname}</div>
        <div><b>Birthdate:</b> {this.props.option.birthdate}</div>
      </div>
    );
  }

}

class ResearcherSearchValue extends Component {

  render() {
    return (
      <div className="Select-value">
        <span className="Select-value-label">
          <b>{this.props.value.cuid}</b>
        </span>
      </div>
    );
  }

}

class ResearcherSearch extends Component {

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
    callApi(`researchers/${cuid}`).then(res => {
      let value = res.researcher;
      if (!value) {
        value = {cuid};
      }
      if (this.refs.container)
        this.setState({ value: value });
    });
  }

  getResearchers = (input) => {
		if (!input) {
			return Promise.resolve({ options: [] });
		}
    return callSearchApi('researchers', input).then(res => {
      return { options: res.researchers };
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
          loadOptions={this.getResearchers}
          optionComponent={ResearcherSearchOption}
          valueComponent={ResearcherSearchValue}
          filterOption={(option, filter) => true} // disables local filtering (already performed server-side)
        />
      </div>
    );
  }
}

ResearcherSearch.propTypes = {
};

export default ResearcherSearch;
