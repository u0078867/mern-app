import React, { Component, PropTypes } from 'react';

import { FormControl } from 'react-bootstrap';

import _ from 'lodash';


class TextCache extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    let p = this.props.options.path;
    let value = _.get(this.props.formContext.cache, p);
    setTimeout(() => {
      this.props.onChange(value);
    }, 1000);
  }

  componentWillReceiveProps = (nextProps) => {
    if ((this.props.value == nextProps.value) && (this.props.formContext.cache != nextProps.formContext.cache)) {
      console.log('cache changed');
      let p = nextProps.options.path;
      let value2 = _.get(nextProps.formContext.cache, p);
      let value1 = _.get(this.props.formContext.cache, p);
      if (value1 != value2) {
        this.props.onChange(value2);
      }
    }
  }


  onChange = (event) => {
    let value = event.target.value;
    this.props.onChange(value);
  }

  render() {
    return (
      <FormControl
        type="text"
        ref={this.props.id}
        value={this.props.value}
        onChange={this.onChange}
        required={this.props.required}
        disabled={this.props.readonly}
      />
    );
  }
}

TextCache.propTypes = {
};

export default TextCache;
