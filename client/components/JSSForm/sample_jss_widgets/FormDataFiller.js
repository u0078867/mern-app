import React, { Component, PropTypes } from 'react';

import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';
import callApi from 'CLIENT_UTIL/apiCaller';





class FormDataFiller extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (event) => {
    let value = event.target.value;
    this.props.onChange(value);
    callSearchApi(this.props.options.collection, value).then(res => {
      if (res.items.length == 1) {
        let item = res.items[0];
        this.props.formContext.updateFormData(item);
      } else {
        console.log("0 or more than 1 item found");
        this.props.formContext.updateFormData({cuid: undefined});
      }
    });
  }

  render() {
    return (
      <input type="text"
        className="custom"
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
