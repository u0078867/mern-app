import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

//import { FormControl } from 'react-bootstrap';



class SelectCreatable extends Component {

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
    this.setState({value: {
      value: props.value,
      label: props.value
    }});
  }

  onChange = (option) => {
    this.props.onChange(option.value);
    this.setState({value: option});
  }

  render() {
    let options = this.props.options.suggestions.map(o => {
      return {
        value: o,
        label: o,
      };
    })
    return (
      <Select.Creatable
        value={this.state.value}
        required={this.props.required}
        disabled={this.props.readonly}
        onChange={this.onChange}
        options={options}
      />
    );
  }
}

SelectCreatable.propTypes = {
};

export default SelectCreatable;
