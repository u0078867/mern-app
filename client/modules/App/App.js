import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
//import Services from './components/Services';
if (process.env.NODE_ENV === 'development')
  var DevTools = require('./components/DevTools').default;

/*import WAMPConnection from './components/WAMPConnection/WAMPConnection';
import WorkFlowClient from './components/WorkFlowClient/WorkFlowClient';
import KULBadgeToUser from './components/KULBadgeToUser/KULBadgeToUser';
import CacheResearcher from './components/CacheResearcher/CacheResearcher';*/

// Import Actions
//import { setUser, updateCache } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

// Import Selectors
import { getUser, getRedirectUrl } from './AppReducer';


import pubsub from 'pubsub-js';


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    console.log("<App> module mounted");
    this.setState({isMounted: true}); // eslint-disable-line
  }

  componentDidUpdate(prevProps) {
    const { dispatch, redirectUrl } = this.props
    const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn
    const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn

    if (isLoggingIn) {
      //dispatch(navigateTo(redirectUrl))
      this.context.router.push(redirectUrl);
    } else if (isLoggingOut) {
      // do any kind of cleanup or post-logout redirection here
    }
  }

  /*redirectToForm = (url) => {
    this.context.router.push(`/forms/${url}`);
  }*/

  /*setUser = (data) => {
    this.props.dispatch(setUser(data));
    // NOTE:to decouple services, we can even call directly:

    //this.updateCache({
    //  researcher: data,
    //});
    pubsub.publishSync("int-cache-researcher", data);
  }*/

  /*updateCache = (data) => {
    console.log('cached:');
    console.log(data);
    this.props.dispatch(updateCache(data));
  }*/

  render() {
    return (
      <div>
        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="DB data insertion app"
            titleTemplate="%s"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <Header
            switchLanguage={lang => this.props.dispatch(switchLanguage(lang))}
            intl={this.props.intl}
          >
            {/*<Services
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
            </Services>*/}
          </Header>
          <div className={styles.container}>
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    intl: state.intl,

    isLoggedIn: getUser(state) != null,
    redirectUrl: getRedirectUrl(state),
  };
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(App);
