import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Style
import styles from './App.css';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Services from './components/Services';
if (process.env.NODE_ENV === 'development')
  var DevTools = require('./components/DevTools').default;

import WAMPConnection from './components/WAMPConnection/WAMPConnection';
import WorkFlowClient from './components/WorkFlowClient/WorkFlowClient';

// Import Actions
import { toggleAddPost } from './AppActions';
import { switchLanguage } from '../../modules/Intl/IntlActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    console.log("<App> module mounted");
    this.setState({isMounted: true}); // eslint-disable-line
  }

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  redirectToForm = (url) => {
    this.context.router.push(`/forms/${url}`);
  }

  render() {
    return (
      <div>
        {/*this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />*/}
        <div>
          <Helmet
            title="Activity logging app"
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
            toggleAddPost={this.toggleAddPostSection}
          >
            <Services
              data={[
                {'label': 'WAMP connection'},
                {'label': 'Work-flow client'},
              ]}
            >
              <WAMPConnection/>
              <WorkFlowClient onEnterTask={this.redirectToForm} />
            </Services>
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
function mapStateToProps(store) {
  return {
    intl: store.intl,
  };
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(App);
