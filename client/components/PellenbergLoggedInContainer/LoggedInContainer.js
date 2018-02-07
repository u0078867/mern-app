import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// Import Style
import styles from './LoggedInContainer.css';

// Import Components
import Services from './components/Services';
import Cache from './components/Cache/Cache';
import WorkFlowEngine from './components/WorkFlowEngine/WorkFlowEngine';
import Profile from './components/Profile/Profile';
import SessionManager from './components/SessionRecorder/SessionManager';

import {
  Tab,
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap';

// Import Actions
import { updateCache, setGlobalVariables, updateGlobalVariables } from 'MODULE_APP/AppActions';

// Import Selectors
import { getUser } from 'MODULE_APP/AppReducer';
import { getForms } from '../../modules/Form/FormReducer';


import pubsub from 'pubsub-js';
import mustache from 'mustache';
import JsonRefs from 'json-refs';



export class LoggedInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      currentTaskId: null,
    }
  }

  parseAndDerefJSON = (content, data) => {
    let parsed = JSON.parse(mustache.render(JSON.stringify(content), data));
    return JsonRefs.resolveRefs(parsed).then(res => res.resolved);
  }

  componentDidMount() {
    pubsub.subscribe('wf-engine', (msg, data) => {
      data.id = this.state.tasks[0].id;
      this.deleteTask();
      console.log(data)
      pubsub.publishSync('wf-engine-int', data);
      this.consumeTask();
    });
  }

  deleteTask = () => {
    if (this.state.tasks.length == 0) return;
    let task = this.state.tasks.shift();
    this.setState({
      tasks: [].concat(this.state.tasks)
    })
  }

  redirectToForm = (url, data) => {
    let dataQuery = btoa(JSON.stringify(data));
    this.context.router.push(`/forms/${url}?d=${dataQuery}`);
  }

  onWait = (task, showProceed) => {
    this.showProceed = showProceed;
    this.storeTask(task, () => {
      console.log('storing tasks:')
      console.log(this.state.tasks)
      if (this.state.tasks.length == 1)
        this.consumeTask();
    });
  }

  onStart = () => {
    pubsub.publishSync('sess-rec-int', { command: 'record' });
  }

  onStop = () => {
    this.setState({ tasks: [] });
    pubsub.publishSync('sess-rec-int', { command: 'stop' });
  }

  onComplete = () => {
    pubsub.publishSync('sess-rec-int', { command: 'stop' });
  }

  storeTask = (task, cb) => {
    this.setState({
      tasks: [].concat(this.state.tasks, [task])
    }, cb)
  }

  consumeTask = () => {
    if (this.state.tasks.length == 0) return;
    let task = this.state.tasks[0];
    console.log('consuming tasks:')
    console.log(this.state.tasks)
    let form = this.props.forms.find(form => {
      let found = (form.key == task.id);
      if (task.form) {
        found = found || (form.key == task.form.key);
      }
      return found;
    });
    console.log(form);
    if (form) {
      // Parse variable definitions
      this.parseAndDerefJSON(task.varDefinitions, { task })
      .then(varDefinitions => {
        // Update workflow variables
        task.updateVariables(varDefinitions.on_activity_wait);
        // Update global variables with the workflow ones
        this.props.dispatch(updateGlobalVariables(task.parentContext.variables));
        // Redirect to form
        console.log(task.parentContext.variables);
        this.setState({ currentTaskId: task.id }, () => {
          this.redirectToForm(`${form.slug}-${form.cuid}`, task.parentContext.variables);
        });
      });
    } else {
      this.deleteTask();
      console.log('Corresponding form not found');
      this.showProceed('Corresponding form not found');
      this.setState({ currentTaskId: task.id }, () => {
        this.context.router.push('/forms')
      });
    }
  }

  onReplayEvent = (event, cb) => {
    let originalForm = event.form;
    let form = this.props.forms.find(form => {
      let found = (form.key == originalForm.key);
      return found;
    });
    if (form) {
      // Redirect to form
      let data = event.stored_record || event.form_data;
      cb();
      this.redirectToForm(`${form.slug}-${form.cuid}`, data);
    } else {
      console.log('Corresponding form not found');
      cb('form not found');
    }
  }

  updateCache = (data) => {
    console.log('cached:');
    console.log(data);
    this.props.dispatch(updateCache(data));
  }

  onGlobalVarsUpload = (vars) => {
    this.props.dispatch(setGlobalVariables(vars));
  }

  onTabChange = (key) => {
    this.context.router.push(`/${key}`);
  }

  onSessionNameChange = (name) => {
    this.updateCache({ session: name });
  }

  render() {
    return (
      <div>
        <div className={styles['services']}>
          <Services
            data={[
              {'label': 'Work-flow engine'},
              {'label': 'Cache'},
              {'label': 'Profile'},
              {'label': 'Session recorder / re-player'},
            ]}
          >
            <WorkFlowEngine
              onWait={this.onWait}
              onStart={this.onStart}
              onStop={this.onStop}
              onComplete={this.onComplete}
              currentTaskId={this.state.currentTaskId}
              listenTopic="wf-engine-int"
            />
            <Cache onNewValue={this.updateCache}/>
            <Profile onVarsLoad={this.onGlobalVarsUpload}/>
            <SessionManager
              listenTopic="sess-rec-int"
              onSessionNameChange={this.onSessionNameChange}
              onReplayEvent={this.onReplayEvent}
            />
          </Services>
        </div>

        <Tab.Container id="modules" defaultActiveKey="dashboard" onSelect={this.onTabChange}>
          <Nav bsStyle="pills">
            <NavItem eventKey="dashboard">Dashboard</NavItem>
            <NavItem eventKey="forms">Forms</NavItem>
            {/*<NavItem eventKey="subms" disabled>Submissions</NavItem>*/}
            <NavItem eventKey="query">Query database data</NavItem>
          </Nav>
        </Tab.Container>

        <div className={styles.container}>
          {this.props.children}
        </div>

      </div>
    );
  }
}

LoggedInContainer.propTypes = {
};

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    //showServices: getShowServices(state),
    user: getUser(state),
    forms: getForms(state),
  };
}

LoggedInContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(LoggedInContainer);
