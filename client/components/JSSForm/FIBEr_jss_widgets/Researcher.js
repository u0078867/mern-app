import React, { Component, PropTypes } from 'react';


import { FormControl } from 'react-bootstrap';



class Researcher extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.setValueFromProps(this.props);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValueFromProps(nextProps);
  }

  setValueFromProps = (props) => {
    if (props.value == undefined) {
      if (props.formContext.cache && props.formContext.cache.researcher) {
        let value = props.formContext.cache.researcher[props.options.field];
        this.props.onChange(value);
      }
    }
  }

  onChange = (event) => {
    let value = event.target.value;
    this.props.onChange(value);
  }

  render() {
    return (
      <FormControl type="text"
        value={this.props.value}
        required={this.props.required}
        readOnly={this.props.readonly}
        onChange={this.onChange}
      />
    );
  }
}

Researcher.propTypes = {
};

export default Researcher;
