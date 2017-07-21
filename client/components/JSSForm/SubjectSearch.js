import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import SubjectViewer from './components/SubjectViewer';
import callSearchApi from '../../util/apiSearchCaller';
import callApi from '../../util/apiCaller';

class SubjectSearchOption extends Component {

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
        <SubjectViewer {...this.props.option} />
        {/*<div><b>CUID:</b> {this.props.option.cuid}</div>
        <div><b>Attributes:</b></div>
        {this.props.option.attributes && this.props.option.attributes.map(attribute => {
          return <div style={{paddingLeft: "10px"}} key={Math.random()}><b>{attribute.name}:</b> {attribute.value}</div>;
        })}*/}
      </div>
    );
  }

}

class SubjectSearchValue extends Component {

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

class SubjectSearch extends Component {

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
    callApi(`subjects/${cuid}`).then(res => {
      let value = res.subject;
      if (!value) {
        value = {cuid};
      }
      if (this.refs.container)
        this.setState({ value: value });
    });
  }

  getSubjects = (input) => {
		if (!input) {
			return Promise.resolve({ options: [] });
		}
    return callSearchApi('subjects', input).then(res => {
      return { options: res.subjects };
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
          loadOptions={this.getSubjects}
          optionComponent={SubjectSearchOption}
          valueComponent={SubjectSearchValue}
          filterOption={(option, filter) => true} // disables local filtering (already performed server-side)
        />
      </div>
    );
  }
}

SubjectSearch.propTypes = {
};

export default SubjectSearch;
