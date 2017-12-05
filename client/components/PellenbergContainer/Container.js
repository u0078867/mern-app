import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import pubsub from 'pubsub-js';

// Import Style
import styles from './Container.css';

// Import Components


// Import Actions
import { setUser } from 'MODULE_APP/AppActions';

// Import Selectors
import { getShowServices, getUser } from 'MODULE_APP/AppReducer';



export class Container extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  logout = () => {
    this.props.dispatch(setUser(null));
    pubsub.publishSync("int-cache-researcher", undefined);
    this.context.router.push(`/login`);
  }

  render() {
    const cls = `${styles['services']} ${(this.props.showServices ? styles.appear : '')}`;
    var welcomeMessage = null;
    var user = this.props.user;
    if (user) {
      welcomeMessage =
      <h2 className="text-center">
        Welcome <i>{user.name} {user.surname} ({user.institution_id})</i>. <a href="#" onClick={this.logout}>Switch user</a>
      </h2>
    }
    return (
      <div>
        <div className={styles.header}></div>
        {welcomeMessage}
        <div className={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Container.propTypes = {
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showServices: getShowServices(state),
    user: getUser(state),
  };
}

Container.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Container);
