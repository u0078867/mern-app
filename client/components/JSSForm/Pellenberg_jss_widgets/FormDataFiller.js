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

  componentDidMount() {
    setTimeout(() => {
      let value = this.props.value;
      this.fillFormFromValue(value);
    }, 10);
  }

  fillFormFromValue = (value) => {
    this.props.onChange(value);
    var p = this.props.options.field || this.props.id.split("_").slice(1);  // tokenize path
    if (/*p == 'cuid'*/ false) {
      callApi(`${this.props.options.collection}/${value}`).then(res => {
        if (res.item) {
          //this.props.formContext.updateFormData(res.item);
          this.props.formContext.updateLocalVariables({
            'auto_current': false,
          }, () => {
            this.props.formContext.updateFormData(res.item);
          })
        }
      });
    } else {
      callSearchApi(this.props.options.collection, value).then(res => {
        let goodItems = [];
        for (var item of res.items) {
          let itemValue = _.get(item, p);
          if (value == itemValue) {
            goodItems.push(item);
          }
        }
        if (goodItems.length == 1) {
          //this.props.formContext.updateFormData(goodItems[0]);
          this.props.formContext.updateLocalVariables({
            'auto_current': false,
          }, () => {
            this.props.formContext.updateFormData(goodItems[0]);
          })
        } else {
          this.props.formContext.updateFormData({cuid: undefined});
        }
      });
    }
  }

  onChange = (event) => {
    let value = event.target.value;
    this.fillFormFromValue(value);
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
