import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import pubsub from 'pubsub-js';


import callApi from 'CLIENT_UTIL/apiCaller';


// Import Style

// Import Components
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Col,
  Button,
  Panel,
} from 'react-bootstrap';

// Import Actions
import { setUser, loginViaCredentials, loginViaToken } from 'MODULE_APP/AppActions';

// Import Selectors
import { getUser } from 'MODULE_APP/AppReducer';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uNumber: '',
      accessKey: '',
      token: '',
      errorVisible: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    let { isLoggedIn, user } = nextProps;
    if (nextProps.isLoggedIn) {
      this.postLogin({ user });
    }
  }

  onChangeUNumber = (event) => {
    let value = event.target.value;
    this.setState({ uNumber: value });
  }

  onChangeAccessKey = (event) => {
    let value = event.target.value;
    this.setState({ accessKey: value });
  }

  onLoginViaCredentials = (event) => {
    let { uNumber, accessKey } = this.state;
    this.loginViaCredentials({
      username: uNumber,
      password: accessKey,
    })
  }

  loginViaCredentials = (data) => {
    this.props.dispatch(loginViaCredentials(data))
    .catch(err => {
      this.postError(err);
    })
  }

  onChangeToken = (event) => {
    let value = event.target.value;
    this.setState({ token: value });
  }

  onLoginViaToken = (event) => {
    let { token } = this.state;
    this.loginViaToken({
      token,
    })
  }

  loginViaToken = (data) => {
    this.props.dispatch(loginViaToken(data))
    .catch(err => {
      this.postError(err);
    })
  }


  postLogin = (data) => {
    let { user } = data;
    // Hide errors
    this.setState({
      errorVisible: false,
      errorMessage: "",
    })
    // Store logged user in the cache service
    setTimeout(() => {
      pubsub.publishSync("cache", { user });
    }, 1000);
    // Redirect to dashboard
    setImmediate(() => {
      this.context.router.push('/dashboard');
    });
  }

  postError = (err) => {
    this.setState({
      errorVisible: true,
      errorMessage: err.message,
    })
  }

  render() {
    let error = null;
    if (this.state.errorVisible) {
      error =
        <Panel header={"Login error"} bsStyle="danger">
          {this.state.errorMessage}
        </Panel>
    }
    return (
      <div>
        {error}

        <Panel header="Access via credentials">
          <FormGroup>
            <ControlLabel>Username (u-number):</ControlLabel>
            <FormControl type="text" ref="uNumber" value={this.state.uNumber} onChange={this.onChangeUNumber} />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Access key:</ControlLabel>
            <FormControl type="password" ref="name" value={this.state.accessKey} onChange={this.onChangeAccessKey} />
          </FormGroup>
          <Button bsStyle="primary" bsSize="large" onClick={this.onLoginViaCredentials}>Login</Button>
        </Panel>

        <Panel header="Access via token">
          <FormGroup>
            <ControlLabel>Access token:</ControlLabel>
            <FormControl type="password" ref="name" value={this.state.token} onChange={this.onChangeToken} />
          </FormGroup>
          <Button bsStyle="primary" bsSize="large" onClick={this.onLoginViaToken}>Login</Button>
        </Panel>

      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
LoginPage.need = [];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: getUser(state),
    isLoggedIn: getUser(state) != null,
  };
}

LoginPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(LoginPage);
