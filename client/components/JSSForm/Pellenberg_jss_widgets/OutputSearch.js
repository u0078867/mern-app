import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import OutputViewer from './components/OutputViewer';
import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';
import callApi from 'CLIENT_UTIL/apiCaller';

import styles from './ComponentSearch.css';

var Viewer = OutputViewer;


class OutputSearchOption extends Component {

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
        <Viewer item={this.props.option} forms={this.props.forms} />
      </div>
    );

  }

}

class OutputSearchValue extends Component {

  render() {
    return (
      <div className={styles["select-value"]}>
        <Viewer item={this.props.value} forms={this.props.forms} />
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
    if (!cuid) return;
    callApi(`outputs/${cuid}`).then(res => {
      let value = res.item;
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
      if (!res.items) res.items = [];
      return { options: res.items };
    });
	}

  onChange = (value) => {;
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
          loadOptions={this.getOutputs}
          optionComponent={(props) => <OutputSearchOption {...props} forms={this.props.formContext.forms} />}
          valueComponent={(props) => <OutputSearchValue {...props} forms={this.props.formContext.forms} />}
          filterOption={(option, filter) => true} // disables local filtering (already performed server-side)
        />
      </div>
    );
  }
}

OutputSearch.propTypes = {
};

export default OutputSearch;
