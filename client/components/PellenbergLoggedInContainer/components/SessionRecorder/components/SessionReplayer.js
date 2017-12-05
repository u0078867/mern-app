

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
import styles from './SessionReplayer.css';

// Import pub-sub lib
import pubsub from 'pubsub-js';



class SessionReplayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'idle',
      session: {},
      currentEventIndex: null,
      message: '',
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

      case 'continue':
        this.onContinue();
        break;

    }
  }

  consumeEvent = () => {
    // Get current event
    let event = this.state.session.events[this.state.currentEventIndex];
    // Callback
    let cb = (message) => {
      if (!message) message = '';
      this.setState( { message });
    }
    this.props.onReplayEvent(event, cb);
  }

  onPlay = (event) => {

    switch (this.state.status) {

      case 'ready':
      case 'stopped':
        this.postPlayLogic();
        break;

      case 'running':
        break;

    }

  }

  postPlayLogic = () => {
    // Increment event index
    this.setState({
      status: "running",
      currentEventIndex: 0,
      message: '',
    }, () => {
      this.consumeEvent();
    });
  }

  onNext = (event) => {

    switch (this.state.status) {

      case 'ready':
      case 'stopped':
        break;

      case 'running':
        this.postNextLogic();
        break;

    }

  }

  postNextLogic = () => {
    let nextIndex = this.state.currentEventIndex + 1;
    if (nextIndex >= this.state.session.events.length) {
      nextIndex = 0;
    }
    this.setState({
      currentEventIndex: nextIndex,
    }, () => {
      this.consumeEvent();
    });
  }

  onPrev = (event) => {

    switch (this.state.status) {

      case 'ready':
      case 'stopped':
        break;

      case 'running':
        this.postPrevLogic();
        break;

    }

  }

  postPrevLogic = () => {
    let prevIndex = this.state.currentEventIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.state.session.events.length - 1;
    }
    this.setState({
      currentEventIndex: prevIndex,
    }, () => {
      this.consumeEvent();
    });
  }

  onStop = (event) => {

    switch (this.state.status) {

      case 'ready':
      case 'stopped':
        break;

      case 'running':
        this.postStopLogic();
        break;

    }

  }

  postStopLogic = () => {
    this.setState({
      status: "stopped",
      currentEventIndex: null,
      message: '',
    });
  }


  onSessFileLoad = (event) => {
    // Get file
    const file = event.target.files[0];
    // Read file
    var reader = new FileReader();
    reader.onload = event => {
      var content = reader.result;
      try {
        let session = JSON.parse(content);
        this.setState({
          session,
          status: 'ready'
        });
      } catch (err) {
        this.setState({
          status: 'crashed'
        });
      }
    }
    if (file) {
      reader.readAsText(file);
    }
  }



  render() {
    var labelStatus = '';
    switch (this.state.status) {
      case 'idle':
        labelStatus = 'default';
        break;
      case 'ready':
        labelStatus = 'info';
        break;
      case 'running':
      case 'completed':
        labelStatus = 'success';
        break;
      case 'stopped':
      case 'crashed':
        labelStatus = 'danger';
        break;
    }
    let events = [];
    if (this.state.session.events) {
      events = this.state.session.events;
    }
    let index = '?';
    let event = {};
    if (events && this.state.currentEventIndex != null) {
      let idx = this.state.currentEventIndex;
      event = events[idx];
      index = idx + 1;
    }
    return (
      <div className={styles['content']}>
        <FormGroup>
          <ControlLabel>Load JSON file with session content:</ControlLabel>
          <FormControl type="file" multiple={false} onChange={this.onSessFileLoad}/>
        </FormGroup>
        <Form inline>
          <FormGroup>
            <Button onClick={this.onPlay}><Glyphicon glyph="play" /></Button>
            <Button onClick={this.onStop}><Glyphicon glyph="stop" /></Button>
            {' '}
            <Label bsStyle={labelStatus}>{this.state.status}</Label>
            {' '}
          </FormGroup>
        </Form>
        <Form inline>
          <FormGroup>
            <Button onClick={this.onPrev}><Glyphicon glyph="step-backward" /></Button>
            <Button onClick={this.onNext}><Glyphicon glyph="step-forward" /></Button>
            {' '}
            <FormControl.Static>{`${index} / ${events.length}`}</FormControl.Static>
          </FormGroup>
        </Form>
        <FormGroup>

          <FormControl.Static><strong>Current event type:</strong> {event.type}</FormControl.Static>
          <FormControl.Static>{this.state.message}</FormControl.Static>
        </FormGroup>
      </div>
    )
  }

}

export default SessionReplayer;
