import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import AttributesViewer from './components/AttributesViewer';
import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';
import callApi from 'CLIENT_UTIL/apiCaller';
import pubsub from 'pubsub-js';

import styles from './ComponentSearch.css';

class ResearcherSearchOption extends Component {

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
        <div><b>Surname:</b> {this.props.option.surname}</div>
        <div><b>Birthdate:</b> {this.props.option.birthdate}</div>*/}
        <AttributesViewer item={this.props.option} />
      </div>
    );
  }

}

class ResearcherSearchValue extends Component {

  render() {
    return (
      <div className={styles["select-value"]}>
        <AttributesViewer item={this.props.value} />
      </div>
    );
  }

}

class ResearcherSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  /*componentWillMount = () => {
    console.log('componentWillMount');
    console.log(this.props.formContext);
    this.setValueFromProps(this.props);
  }*/

  componentDidMount = () => {
    //var cuid = undefined;
    console.log(this.props.value)
    if (this.props.value) {
      this.setValueFromProps(this.props);
    } else {
      if (this.props.formContext.cache.researcher) {
        console.log(this.props.formContext.cache.researcher)
        let cuid = this.props.formContext.cache.researcher.cuid;
        this.props.onChange(cuid);
      } else {
        this.setValueFromProps(this.props);
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    let cuid = props.value;
    callApi(`researchers/${cuid}`).then(res => {
      let value = res.item;
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
      return { options: res.items };
    });
	}

  onChange = (value) => {
    if (value) {
      console.log(value)
      this.props.onChange(value.cuid);
      pubsub.publish("cache", { researcher: value });
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
          loadOptions={this.getResearchers}
          optionComponent={ResearcherSearchOption}
          valueComponent={ResearcherSearchValue}
          filterOption={(option, filter) => true} // disables local filtering (already performed server-side)
          disabled={this.props.readonly}
        />
      </div>
    );
  }
}

ResearcherSearch.propTypes = {
};

export default ResearcherSearch;
