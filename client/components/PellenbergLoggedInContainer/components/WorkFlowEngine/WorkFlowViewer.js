
import React from 'react';
import ReactDOM from 'react-dom';

import 'style!./WorkFlowViewer.css';


class WorkFlowViewer extends React.Component {

  constructor(props) {
    super(props);
    this.highlightedTasks = [];
  }

  componentDidMount() {
    this.attachToDOM();
    this.highlightCurrentTask(this.props.currentTask);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentTask != this.props.currentTask) {
      this.highlightCurrentTask(nextProps.currentTask);
    }
  }

  attachToDOM = () => {
    // Attach to window
    let viewerElem = ReactDOM.findDOMNode(this.refs.viewer);
    let viewer = this.props.viewer;
    viewer.attachTo(viewerElem);
    console.log('attached')
    // Fit diagram to size
    let canvas = viewer.get('canvas');
    canvas.zoom('fit-viewport');
  }

  detachFromDOM = () => {
    let viewer = this.props.viewer;
    viewer.detach();
  }

  unhighlightAllTasks = () => {
    while(this.highlightedTasks.length) {
      let task = this.highlightedTasks[this.highlightedTasks.length - 1];
      this.unhighlightTask(task);
    }
  }

  highlightCurrentTask = (id) => {
    if (!id) return;
    // unhighlight all tasks
    this.unhighlightAllTasks();
    // highlight current task
    this.highlightTask(id);
  }

  highlightTask = (id) => {
    let viewer = this.props.viewer;
    let canvas = viewer.get('canvas');
    let elementRegistry = viewer.get('elementRegistry');
    let overlays = viewer.get('overlays');
    let shape = elementRegistry.get(id);
    canvas.zoom('fit-viewport');
    //canvas.addMarker('mount-camera', 'highlight');  // does not work
    overlays.add(id, {
      position: {
        top: 0,
        left: 0
      },
      html: `<div style="opacity: 0.4; background-color: green; pointer-events: none; width: ${shape.width}px; height: ${shape.height}px; border-radius: 8px;"></div>`
    });
    this.highlightedTasks.push(id);
  }

  unhighlightTask = (id) => {
    let viewer = this.props.viewer;
    let overlays = viewer.get('overlays');
    overlays.remove({ element: id });
    this.highlightedTasks.splice(this.highlightedTasks.indexOf(id), 1);
  }

  render() {
    let { width, height } = this.props;
    return (
      <div style={{position: "relative", height: height, width: width}}>
        <div ref="viewer" style={{position: "absolute", height: "100%", width: "100%"}}></div>
      </div>
    )
  }

  componentWillUnmount() {
    this.unhighlightAllTasks();
    this.detachFromDOM()
  }

}

export default WorkFlowViewer;
