import './WorkFlowViewer.css';

import React from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Glyphicon,
  Label,
} from 'react-bootstrap';

// Import Style
import styles from './WorkFlowEngine.css';

// Import engine
const Bpmn = require('bpmn-engine');
const camundaModdle = require('camunda-bpmn-moddle/resources/camunda.json');
//const EventEmitter = require('eventemitter3');
const EventEmitter = require('events').EventEmitter;

// Import viewer
let BpmnViewer;
let viewer;
if (typeof window !== 'undefined') {
  BpmnViewer = require('bpmn-js');
  viewer = new BpmnViewer();
}
import PopoutWindow from 'react-popout';
import WorkFlowViewer from './WorkFlowViewer';

// Import pubsub
import pubsub from 'pubsub-js';



class WorkFlowEngine extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'idle',
      waitingTasks: [],
      showMessage: false,
      clientMessage: '',
      showViewer: false,
    };
    this.engine = null;
    this.engineState = null;
    this.listener = null;
    this.process = null;
    this.subscriptions = {};
    this.varDefinitions = null;
    this.variables = {};
    this.instance = null;
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

  subscriber = (data) => {
    // Update variables
    if (data.variables) {
      this.updateVariables(data.variables);
    }
    // Execute requested command
    switch (data.command) {
      case 'continue':
        this.onContinue(data.id);
        break;
    }
  }

  updateVariables = (newVariables) => {
    if (this.instance) {
      // Get variables
      let variables = this.instance.mainProcess.context.variables;
      // Update variables
      variables = Object.assign(variables, newVariables);
    }
  }

  showProceed = msg => {
    this.setState({
      showMessage: true,
      clientMessage: msg
    })
  }

  searchTaskLane = (instance, task) => {
    let containerLane = undefined;
    let lanes = instance.activity.laneSets[0].lanes;
    for (var lane of lanes) {
      for (var activity of lane.flowNodeRef) {
        if (activity.id == task.id) {
          containerLane = lane;
          break;
        }
      }
    }
    return containerLane;
  }

  createEngine = (processXml) => {

    // Create process engine
    this.engine = new Bpmn.Engine({
      name: 'listen example',
      source: processXml,
      moddleOptions: {
        camunda: camundaModdle
      }
    });
    console.log('engine created')

    // Init waiting task
    this.setState({
      waitingTasks: []
    })

    // Create engine events listener
    this.listener = new EventEmitter();

    // Define event handlers
    this.listener.on('wait', (task, instance) => {
      console.log(`${task.type} <${task.id}> of ${instance.id} is waiting`);
      // Get lane which the task belongs to
      let lane = this.searchTaskLane(instance, task);
      task.lane = lane;
      // Add some useful properties to task
      task.varDefinitions = this.varDefinitions;
      task.updateVariables = this.updateVariables;
      task.canConsume = task.properties.onlyConsumeAfter ? false : true;
      console.log(task);
      // Save waiting task
      this.setState({ waitingTasks: [].concat(this.state.waitingTasks, [task]) }, () => {
        this.props.onWait(task, this.showProceed);
      })
    });

    this.listener.on('enter', (task, instance) => {
      console.log(`${task.type} <${task.id}> of ${instance.id} is entered`);
    });

    this.listener.on('start', (task, instance) => {
      console.log(`${task.type} <${task.id}> of ${instance.id} is started`);
    });

    this.listener.on('end', (task, instance) => {
      console.log(`${task.type} <${task.id}> of ${instance.id} is ended`);
      let idx = this.state.waitingTasks.findIndex(wt => wt.id == task.id);
      if (idx >= 0) {
        this.state.waitingTasks.splice(idx, 1);
        this.setState({ waitingTasks: [].concat(this.state.waitingTasks) });
      }
    });

    this.listener.on('taken', (flow) => {
      console.log(`flow <${flow.id}> was taken`);
      for (let task of this.state.waitingTasks) {
        if (task.properties.onlyConsumeAfter == flow.id) {
          task.canConsume = true;
          this.props.onTaskConsumabilityChange(task);
        }
      }
    });

    this.engine.once('end', (definition) => {
      console.log('Process ended');
      this.setState({
        status: 'completed'
      }, () => {
        this.props.onComplete();
      })
    });

  }

  onStart = (event) => {

    switch (this.state.status) {

      case 'ready':

        // Start engine
        this.engine.execute({
          listener: this.listener,
          variables: this.variables,
        }, (err, instance) => {
          this.instance = instance;
          if (err) {
            console.log(err);
            this.setState({
              status: 'crashed'
            })
          } else {
            this.setState({
              status: 'running'
            }, () => this.props.onStart())
          }
        });
        break;

      case 'paused':
        console.log(this.engine)
        // Start engine
        Bpmn.Engine.resume(this.engineState, {
          listener: this.listener
        }, (err, instance) => {
          this.instance = instance;
          if (err) {
            console.log(err);
            this.setState({
              status: 'crashed'
            })
          } else {
            this.setState({
              status: 'running'
            }, () => this.props.onStart())
          }
        });
        break;

    }

  }

  onPause = (event) => {

    if (this.engine) {
      // Stop engine
      this.engine.stop();
      this.engineState = this.engine.getState();
      this.setState({
        status: 'paused'
      })
    }

  }

  onStop = (event) => {

    if (this.engine) {
      // Stop engine
      this.engine.stop();
      this.setState({
        status: 'stopped',
        showMessage: false,
        clientMessage: '',
      }, () => {
        this.props.onStop();
        this.createEngine(this.process);
        this.setState({
          status: 'ready'
        })
      })
    }

  }

  onContinue = (id) => {
    if (this.engine) {
      this.engine.signal(id);
      this.setState({
        showMessage: false,
        clientMessage: '',
      })
    }
  }

  onContinueWaitingTask = () => {
    this.onContinue(this.state.waitingTasks[0].id);
  }

  onFileLoad = (event) => {
    // Get file
    const file = event.target.files[0];
    // Read file
    var reader = new FileReader();
    reader.onload = event => {
      var content = reader.result;
      // Create engine
      this.process = content;
      this.createEngine(this.process);
      // Create viewer
      viewer.importXML(content, (err) => {
        if (err) {
          console.log(err);
          console.log('Error importing viewer data');
          this.setState({
            status: 'crashed'
          });
        } else {
          console.log('Viewer data imported');
          this.setState({
            status: 'ready'
          });
        }
      });
    }
    if (file) {
      reader.readAsText(file);
    }
  }

  onVarsLoad = (event) => {
    // Get file
    const file = event.target.files[0];
    // Read file
    var reader = new FileReader();
    reader.onload = event => {
      var content = reader.result;
      this.varDefinitions = JSON.parse(content);
      this.variables = JSON.parse(JSON.stringify(this.varDefinitions.initial));
    }
    if (file) {
      reader.readAsText(file);
    }
  }

  onCloseViewer = () => {
    this.setState({showViewer: false});
  }

  onOpenViewer = () => {
    this.setState({showViewer: true});
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
      case 'paused':
        labelStatus = 'warning';
        break;
    }
    return (
      <div className={styles['content']}>
        <FormGroup>
          <ControlLabel>Load BPMN file:</ControlLabel>
          <FormControl type="file" multiple={false} onChange={this.onFileLoad}/>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Load JSON file with variable definitions:</ControlLabel>
          <FormControl type="file" multiple={false} onChange={this.onVarsLoad}/>
        </FormGroup>
        <Form inline>
          <FormGroup>
            <Button onClick={this.onStart}><Glyphicon glyph="play" /></Button>
            <Button onClick={this.onStop}><Glyphicon glyph="stop" /></Button>
            <Button onClick={this.onPause}><Glyphicon glyph="pause" /></Button>
            {' '}
            <Label bsStyle={labelStatus}>{this.state.status}</Label>
            {' '}
            <a onClick={this.onOpenViewer}>show current task</a>
          </FormGroup>
        </Form>
        <FormGroup>
          <FormControl.Static><strong>Waiting activities number:</strong> {this.state.waitingTasks.length}</FormControl.Static>
        </FormGroup>
        {this.state.showMessage ?
          <FormGroup>
            <FormControl.Static>{this.state.clientMessage}.&nbsp;<a style={{cursor: 'pointer'}} onClick={this.onContinueWaitingTask}>Proceed</a>&nbsp;with the work-flow.</FormControl.Static>
          </FormGroup>
        : null}
        {this.state.showViewer ?
          <PopoutWindow title='Worfk-flow' onClosing={this.onCloseViewer} options={{position: "relative", height: '600px', width: '1000px'}}>
            <WorkFlowViewer
              viewer={viewer}
              height="600px"
              width="1000px"
              currentTask={this.props.currentTaskId}
            />
          </PopoutWindow>
        : null}
      </div>
    )
  }

}

export default WorkFlowEngine;
