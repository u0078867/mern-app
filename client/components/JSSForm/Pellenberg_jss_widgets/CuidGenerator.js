import React, { Component, PropTypes } from 'react';
import cuid from 'cuid';

import {
  Form,
  FormGroup,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';



class CuidGenerator extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    let value = cuid();
    setTimeout(() => this.props.onChange(value), 500);
    //this.props.onChange(value); // this gives a problem when using formContext in other widgets (??)
  }

  onChange = (event) => {
    let value = event.target.value;
    this.props.onChange(value);
  }

  generate = (event) => {
    let value = cuid();
    this.props.onChange(value);
  }

  render() {
    return (
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl type="text"
              value={this.props.value}
              required={this.props.required}
              onChange={this.onChange}
              disabled={this.props.readonly}
            />
            <InputGroup.Button>
              <Button onClick={this.generate}>Re-generate ID</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

CuidGenerator.propTypes = {
};

export default CuidGenerator;
