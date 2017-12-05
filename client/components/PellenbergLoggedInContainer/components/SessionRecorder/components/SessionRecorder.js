

import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Checkbox,
  Button,
  Glyphicon,
  Label,
} from 'react-bootstrap';

// Import Style
import styles from './SessionRecorder.css';

// Import pub-sub lib
import pubsub from 'pubsub-js';



class SessionRecorder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'ready',
      fileLink: null,
      showFileLink: false,
      events: [],
      sessionName: "",
      sessionNameEditable: true,
      enableRemoteTrigger: true,
    };
    this.subscriptions = {};
  }

  componentDidMount() {
    this.subscribeTopic(this.props.listenTopic, this.subscriber);
  }

  subscribeTopic = (topic, handler) => {
    if (this.subscriptions[topic]) {
      this.unsubscribeTopic(topic);
    }
    this.subscriptions[topic] = pubsub.subscribe(topic, (msg, data) => handler(data));
  }

  unsubscribeTopic = (topic) => {
    punsub.unsubscribe(this.subscriptions[topic]);
    delete this.subscriptions[topic];
  }

  subscriber = (message) => {
    switch (message.command) {

      case 'store':
        this.onNewEvent(message.data)
        break;

      case 'record':
        if (this.state.enableRemoteTrigger) {
          this.onRecord();
        }
        break;

      case 'stop':
        if (this.state.enableRemoteTrigger) {
          this.onStop();
        }
        break;

    }
  }

  onNewEvent = (data) => {
    switch (this.state.status) {

      case 'recording':
        this.setState({ events: [].concat(this.state.events, [data]) });
        break;

    }

  }

  onRecord = (event) => {

    switch (this.state.status) {

      case 'ready':
      case 'stopped':
        this.postStartLogic();
        break;

      case 'recording':
        break;

    }

  }

  postStartLogic = () => {
    this.setState({
      status: "recording",
      fileLink: null,
      showFileLink: false,
      events: [],
      sessionNameEditable: false,
    });
  }


  onStop = (event) => {

    switch (this.state.status) {

      case 'ready':
      case 'stopped':
        break;

      case 'recording':
        this.postStopLogic();
        break;

    }

  }

  postStopLogic = () => {
    this.setState({
      status: "stopped",
      sessionNameEditable: true,
    }, () => {
      this.createFileData();
    });
  }

  createFileData = () => {
    let data = {
      file_version: 1,
      session_name: this.state.sessionName,
      events: this.state.events,
    };
    var json = JSON.stringify(data, null, 2);
    var blob = new Blob([json], {type: "application/json"});
    var url  = URL.createObjectURL(blob);
    this.setState({fileLink: url, showFileLink: true});
  }

  onSessionNameChange = (event) => {
    let name = event.target.value;
    this.props.onSessionNameChange(name);
    this.setSessionName(name);
  }

  setSessionName = (name) => {
    this.setState({ sessionName: name });
  }

  onEnableRemoteTriggerChange = (event) => {
    let enabled = event.target.checked;
    this.setEnableRemoteTrigger(enabled);
  }

  setEnableRemoteTrigger = (enabled) => {
    this.setState({ enableRemoteTrigger: enabled });
  }


  render() {
    var labelStatus = '';
    switch (this.state.status) {
      case 'ready':
        labelStatus = 'info';
        break;
      case 'recording':
        labelStatus = 'success';
        break;
      case 'stopped':
      case 'crashed':
        labelStatus = 'danger';
        break;
    }
    return (
      <div className={styles['content']}>
        <FormGroup>
          <ControlLabel>Session name:</ControlLabel>
          <FormControl type="text" disabled={!this.state.sessionNameEditable} value={this.state.sessionName} onChange={this.onSessionNameChange}/>
        </FormGroup>
        <FormGroup>
          <Checkbox checked={this.state.enableRemoteTrigger} onChange={this.onEnableRemoteTriggerChange}>
            Record / Stop on remote trigger
          </Checkbox>
        </FormGroup>
        <Form inline>
          <FormGroup>
            <Button onClick={this.onRecord}><Glyphicon glyph="record" /></Button>
            <Button onClick={this.onStop}><Glyphicon glyph="stop" /></Button>
            {' '}
            <Label bsStyle={labelStatus}>{this.state.status}</Label>
          </FormGroup>
        </Form>
        <FormGroup>
          <FormControl.Static><strong>Events recorded:</strong> {this.state.events.length}</FormControl.Static>
        </FormGroup>
        {this.state.showFileLink ? <a href={this.state.fileLink} download={`session_${this.state.sessionName}.json`}>Download session file</a> : null}
      </div>
    )
  }

}

export default SessionRecorder;
