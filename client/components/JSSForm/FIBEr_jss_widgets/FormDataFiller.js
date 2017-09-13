import React, { Component, PropTypes } from 'react';

import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';
import callApi from 'CLIENT_UTIL/apiCaller';

import _ from 'lodash';

import { FormControl } from 'react-bootstrap';



class FormDataFiller extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (event) => {
    let value = event.target.value;
    this.props.onChange(value);
    var p = this.props.id.split("_").slice(1);  // tokenize path
    callSearchApi(this.props.options.collection, value).then(res => {
      if (res.items.length == 1) {
        let item = res.items[0];
        let itemValue = _.get(item, p);
        if (value == itemValue) {
          this.props.formContext.updateFormData(item);
        } else {
          console.log("the found item is wrong");
          //this.props.formContext.updateFormData({cuid: undefined});
        }
      } else {
        console.log("0 or more than 1 item found");
        this.props.formContext.updateFormData({cuid: undefined});
      }
    });
  }

  render() {
    return (
      <FormControl type="text"
        value={this.props.value}
        required={this.props.required}
        onChange={this.onChange}
      />
    );
  }
}

FormDataFiller.propTypes = {
};

export default FormDataFiller;
