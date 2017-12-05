

import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Glyphicon,
  Label,
} from 'react-bootstrap';

// Import Style
import styles from './GlobalVariables.css';

import pubsub from 'pubsub-js';



class GlobalVariables extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      variables: {}
    };
  }

  componentDidMount() {

  }

  onVarsLoad = (event) => {
    // Get file
    const file = event.target.files[0];
    // Read file
    var reader = new FileReader();
    reader.onload = event => {
      var content = reader.result;
      var variables = JSON.parse(content);
      this.setState({ variables }, () => {
        this.props.onVarsLoad(variables);
      })
    }
    if (file) {
      reader.readAsText(file);
    }
  }


  render() {

    return (
      <div className={styles['content']}>
        <FormGroup>
          <ControlLabel>Load JSON file with global variables:</ControlLabel>
          <FormControl type="file" multiple={false} onChange={this.onVarsLoad}/>
        </FormGroup>
      </div>
    )
  }

}

export default GlobalVariables;
