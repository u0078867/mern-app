import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './Container.css';

// Import Components
import Services from './components/Services';

import WAMPConnection from './components/WAMPConnection/WAMPConnection';
import WorkFlowClient from './components/WorkFlowClient/WorkFlowClient';
import KULBadgeToUser from './components/KULBadgeToUser/KULBadgeToUser';
import CacheResearcher from './components/CacheResearcher/CacheResearcher';

// Import Actions
import { setUser, updateCache } from 'MODULE_APP/AppActions';

// Import Selectors
import { getShowServices, getUser } from 'MODULE_APP/AppReducer';


import pubsub from 'pubsub-js';


export class Container extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }


  redirectToForm = (url) => {
    this.context.router.push(`/forms/${url}`);
  }

  setUser = (data) => {
    pubsub.publishSync("detect-kul-badge", data);
  }

  updateCache = (data) => {
    console.log('cached:');
    console.log(data);
    this.props.dispatch(updateCache(data));
  }

  render() {
    const cls = `${styles['services']} ${(this.props.showServices ? styles.appear : '')}`;
    var welcomeMessage = null;
    var user = this.props.user;
    if (user) {
      welcomeMessage = <h2 className="text-center">Welcome <i>{user.name} {user.surname} ({user.kul_id})</i></h2>;
    }
    return (
      <div>
        <div className={styles.header}></div>
        {welcomeMessage}
        <div className={cls}>
          <Services
            data={[
              {'label': 'WAMP connection'},
              {'label': 'Work-flow client'},
              {'label': 'KULeuven badge'},
              {'label': 'Cache researcher'},
            ]}
          >
            <WAMPConnection/>
            <WorkFlowClient onEnterTask={this.redirectToForm} />
            <KULBadgeToUser onUserFound={this.setUser} />
            <CacheResearcher onNewValue={this.updateCache}/>
          </Services>
        </div>

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
