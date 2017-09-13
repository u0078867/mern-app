
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import { setRedirectUrl } from '../modules/App/AppActions';
import { getUser } from '../modules/App/AppReducer';


class EnsureLoggedInContainer extends React.Component {

  componentDidMount() {
    const { isLoggedIn, dispatch, currentURL } = this.props

    if (!isLoggedIn) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      dispatch(setRedirectUrl(currentURL))
      //browserHistory.replace("/login")
      this.context.router.push(`/login`);
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }

}

// Grab a reference to the current URL. If this is a web app and you are
// using React Router, you can use `ownProps` to find the URL. Other
// platforms (Native) or routing libraries have similar ways to find
// the current position in the app.
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: getUser(state) != null,
    currentURL: ownProps.location.pathname
  }
}

EnsureLoggedInContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)
