import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import pubsub from 'pubsub-js';

//import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';
import callApi from 'CLIENT_UTIL/apiCaller';


// Import Style

// Import Components
import {HelpBlock, Form, FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';

// Import Actions
import { setUser } from 'MODULE_APP/AppActions'; // action from App

// Import Selectors
//import { getForms, getShowAddForm } from '../../FormReducer';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uNumber: '',
      name: '',
      surname: '',
      loginFailed: false,
    };
  }

  componentDidMount() {
    pubsub.subscribe("detect-kul-badge", (msg, tokens) => {
      this.onChangeName({target: {value: tokens[0]}});
      this.onChangeSurname({target: {value: tokens[1]}});
      this.onChangeUNumber({target: {value: tokens[2]}});
      this.onLogin();
    })
  }

  onChangeName = (event) => {
    let value = event.target.value;
    this.setState({name: value});
  }

  onChangeSurname = (event) => {
    let value = event.target.value;
    this.setState({surname: value});
  }

  onChangeUNumber = (event) => {
    let value = event.target.value;
    this.setState({uNumber: value});

    //this.onLogin();
  }

  onLogin = () => {
    // Search for authorized researchers
    callApi('researchers')
    .then(res => {
      var items = res.items.filter(e => {
        let pass = e.kul_id == this.state.uNumber;
        /*if (!pass)
          return false;
        if (this.state.name.length) {
          pass = pass && (e.name == this.state.name);
        }
        if (this.state.surname.length) {
          pass = pass && (e.surname == this.state.surname);
        }*/
        return pass;
      });
      let L = items.length;
      if (L == 0) {
        this.setState({ loginFailed: true });
        return;
      }
      var user = items[0];
      // Set logged user
      this.props.dispatch(setUser(user));
      // Store logged user in the cache service
      pubsub.publishSync("int-cache-researcher", user);
      // Redirect to dashboard
      this.context.router.push('/dashboard');
    })
  }


  getValidationState () {
    const staffid = /^[a-zA-Z]\d{7}$/;
    if (staffid.test(this.state.uNumber)) return 'success';
    else if(this.state.uNumber.length > 0) return 'error';
    }

  render() {
    return (
      <div>
      { this.state.loginFailed ? <div className="alert alert-danger"><strong>Login failed!</strong> Please ask for authorization before trying to login </div> : null }
      <Form>
        <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <FormControl
              bsSize="large"
              type="text"
              value={this.state.uNumber}
              placeholder="Please scan badge or enter staff ID"
              onChange={this.onChangeUNumber}
            />
            <FormControl.Feedback />
            <HelpBlock>Validation is based on KU Leuven ID, i.e. 1 character, followed by 7 digits.</HelpBlock>
          {' '}
          <Button bsStyle="primary" bsSize="large" block onClick={this.onLogin}>Login</Button>
        </FormGroup>
        </Form>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LoginPage.need = [];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {

  };
}

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(LoginPage);
