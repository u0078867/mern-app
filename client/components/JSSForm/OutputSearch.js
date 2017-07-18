import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import callSearchApi from '../../util/apiSearchCaller';
import callApi from '../../util/apiCaller';

class OutputSearchOption extends Component {

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
    if (!this.props.option.activity)
      return (
        <div
          className={this.props.className}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
        ></div>
      );
    return (
      <div
        className={this.props.className}
        onMouseDown={this.handleMouseDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
      >
        <div><b>CUID:</b> {this.props.option.cuid}</div>
        <div><b>Name:</b> {this.props.option.name}</div>
        <div><b>Uri:</b> {this.props.option.uri}</div>
        <div><b>Activity:</b> {this.props.option.activity.description}</div>
        {this.props.option.activity.subjects.map(subject => {
          let sbj = subject.id;
          return <div key={subject.id}><b>Involved: </b>{sbj.name} {sbj.surname} (born: {sbj.birthdate})</div>
        })}
        {(() => {
          if (!this.props.option.activity.prev)
            return null;
          let sbj = this.props.option.activity.prev.subjects.id;
          return <div><b>Involved previously: </b>{sbj.name} {sbj.surname} (born: {sbj.birthdate})</div>
        })()}
      </div>
    );

  }

}

class OutputSearchValue extends Component {

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

class OutputSearch extends Component {

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
    callApi(`outputs/${cuid}`).then(res => {
      let value = res.output;
      if (!value) {
        value = {cuid};
      }
      if (this.refs.container)
        this.setState({ value: value });
    });
  }

  getOutputs = (input) => {
		if (!input || input.length < 3) {
			return Promise.resolve({ options: [] });
		}
    return callSearchApi('outputs', input).then(res => {
      if (!res.outputs) res.outputs = [];
      return { options: res.outputs };
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
          loadOptions={this.getOutputs}
          optionComponent={OutputSearchOption}
          valueComponent={OutputSearchValue}
          filterOption={(option, filter) => true} // disables local filtering (already performed server-side)
        />
      </div>
    );
  }
}

OutputSearch.propTypes = {
};

export default OutputSearch;