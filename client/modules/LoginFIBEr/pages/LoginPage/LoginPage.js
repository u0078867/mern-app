import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import pubsub from 'pubsub-js';

//import callSearchApi from 'CLIENT_UTIL/apiSearchCaller';
import callApi from 'CLIENT_UTIL/apiCaller';


// Import Style

// Import Components
import { FormGroup, ControlLabel, FormControl, Col, Button } from 'react-bootstrap';

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
    };
  }

  componentDidMount() {
    pubsub.subscribe("detect-kul-badge", (msg, tokens) => {
      this.onChangeName({target: {value: tokens[0]}});
      this.onChangeSurname({target: {value: tokens[1]}});
      this.onChangeUNumber({target: {value: tokens[2]}});
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
  }

  onLogin = () => {
    // Search for authorized researchers
    callApi('researchers')
    .then(res => {
      var items = res.items.filter(e => {
        let pass = e.kul_id == this.state.uNumber;
        if (!pass)
          return false;
        if (this.state.name.length) {
          pass = pass && (e.name == this.state.name);
        }
        if (this.state.surname.length) {
          pass = pass && (e.surname == this.state.surname);
        }
        return pass;
      });
      let L = items.length;
      if (L == 0) {
        alert("No matching researcher found");
        return;
      }
      if (L > 1) {
        alert("More than one researcher found");
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

  render() {
    return (
      <div>
        <h2 className="text-center">Please enter your u-number or scan your badge</h2>
        <FormGroup>
          <ControlLabel>u-number:</ControlLabel>
          <FormControl type="text" ref="uNumber" value={this.state.uNumber} onChange={this.onChangeUNumber} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Name:</ControlLabel>
          <FormControl type="text" ref="name" value={this.state.name} onChange={this.onChangeName} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Surname:</ControlLabel>
          <FormControl type="text" ref="surname" value={this.state.surname} onChange={this.onChangeSurname} />
        </FormGroup>
        <Button bsStyle="primary" bsSize="large" onClick={this.onLogin}>Login</Button>
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
