

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
  Alert,
} from 'react-bootstrap';

// Import Style
import styles from './Profile.css';

import pubsub from 'pubsub-js';



class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      variables: {},
      message: null,
      showMessage: false,
    };
  }

  componentDidMount() {

  }

  onError = (msg) => {
    var message = (
      <Alert
        bsStyle="danger"
        onDismiss={this.onCloseMessage}
      >
        <p><strong>Error</strong> while loading file! </p>
        <br/>
        {msg}
      </Alert>
    )
    this.setState({
      message,
      showMessage: true,
    });
  }

  onCloseMessage = () => {
    this.setState({ showMessage: false });
  }

  onVarsLoad = (event) => {
    // Get file
    const file = event.target.files[0];
    // Read file
    var reader = new FileReader();
    reader.onload = event => {
      var content = reader.result;
      var profile;
      try {
        profile = JSON.parse(content);
      } catch (e) {
        return this.onError('File does not have JSON format.');
      }
      if (!profile.global_variables) {
        return this.onError('File seems not to have the correct content.');
      }
      var variables = profile.global_variables;
      this.setState({ variables }, () => {
        this.props.onVarsLoad(variables);
      });
    }
    if (file) {
      reader.readAsText(file);
    }
  }


  render() {

    return (
      <div className={styles['content']}>
        <FormGroup>
          <ControlLabel>Load JSON file with profile:</ControlLabel>
          <FormControl type="file" multiple={false} onChange={this.onVarsLoad}/>
        </FormGroup>
        {this.state.showMessage ? this.state.message : null}
      </div>
    )
  }

}

export default Profile;
