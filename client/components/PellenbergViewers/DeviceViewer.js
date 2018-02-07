
import React, { PropTypes, Component } from 'react';

import {
  Panel,
  Button,
} from 'react-bootstrap';

import ResearcherInlineViewer from './ResearcherInlineViewer';

import {
  extractOptionTitle,
  titleizeAttribute
} from './utils/formJSONDataExtract';


class OptoCluster extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let material = titleizeAttribute(attributes, attributesSchema, 'material');
    let markerPinsNumber = attributes.find(a => a.name == 'marker_pins_number');
    return (
      <div>
        <div><b>Material:</b> {material.value}</div>
        <div><b>Numer of marker pins:</b> {markerPinsNumber.value}</div>
      </div>
    )
  }

}

class OptoSystem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let camerasNumber = titleizeAttribute(attributes, attributesSchema, 'cameras_number');
    let resolution = titleizeAttribute(attributes, attributesSchema, 'resolution');
    return (
      <div>
        <div><b>Number of cameras:</b> {camerasNumber.value}</div>
        <div><b>Resolution:</b> {resolution.value} {resolution.uom}</div>
      </div>
    )
  }

}

class OptoMarker extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let diameter = titleizeAttribute(attributes, attributesSchema, 'diameter');
    let technology = titleizeAttribute(attributes, attributesSchema, 'technology');
    let surfaceMountingTechnology = titleizeAttribute(attributes, attributesSchema, 'surface_mounting_technology');
    return (
      <div>
        <div><b>Diameter:</b> {diameter.value} {diameter.uom}</div>
        <div><b>Capture technology:</b> {technology.value}</div>
        <div><b>Surface-mounting technology:</b> {surfaceMountingTechnology.value}</div>
      </div>
    )
  }

}

class Computer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let productKey = attributes.find(a => a.name == 'product_key');
    let cpuFreq = titleizeAttribute(attributes, attributesSchema, 'cpu_freq');
    let ramCapacity = titleizeAttribute(attributes, attributesSchema, 'ram_capacity');
    return (
      <div>
        <div><b>Product key/tag:</b> {productKey.value}</div>
        <div><b>CPU frequency:</b> {cpuFreq.value} {cpuFreq.uom}</div>
        <div><b>RAM capacity:</b> {ramCapacity.value} {ramCapacity.uom}</div>
      </div>
    )
  }

}

class USProbe extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let radiusOfCurvature = titleizeAttribute(attributes, attributesSchema, 'radius_of_curvature');
    let fovAngle = titleizeAttribute(attributes, attributesSchema, 'fov_angle');
    let fovWidth = titleizeAttribute(attributes, attributesSchema, 'fov_width');
    let fovHeight = titleizeAttribute(attributes, attributesSchema, 'fov_height');
    return (
      <div>
        <div><b>Radius of curvature:</b> {radiusOfCurvature.value} {radiusOfCurvature.uom}</div>
        <div><b>FOV angle:</b> {fovAngle.value} {fovAngle.uom}</div>
        <div><b>FOV width:</b> {fovWidth.value} {fovWidth.uom}</div>
        <div><b>FOV height:</b> {fovHeight.value} {fovHeight.uom}</div>
      </div>
    )
  }

}

class USBeamformer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let hasRFSignal = attributes.find(a => a.name == 'has_rf_signal');
    return (
      <div>
        <div><b>Has RF signal?</b> {hasRFSignal.value ? 'Yes' : 'No'} </div>
      </div>
    )
  }

}

class USProbeSkinInterface extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let interfaceChordLength = titleizeAttribute(attributes, attributesSchema, 'interface_chord_length');
    let depth = titleizeAttribute(attributes, attributesSchema, 'depth');
    return (
      <div>
        <div><b>Chord length:</b> {interfaceChordLength.value} {interfaceChordLength.uom}</div>
        <div><b>Depth:</b> {depth.value} {depth.uom}</div>
      </div>
    )
  }

}

class USProbeHolder extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let material = titleizeAttribute(attributes, attributesSchema, 'material');
    return (
      <div>
        <div><b>Material:</b> {material.value}</div>
      </div>
    )
  }

}

class SignalConverter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let attributes = this.props.attributes;
    let schema = this.props.schema;
    let attributesSchema = schema.properties.attributes;
    let inputSignalType = titleizeAttribute(attributes, attributesSchema, 'input_signal_type');
    let outputSignalType = titleizeAttribute(attributes, attributesSchema, 'output_signal_type');
    let invertedLogic = attributes.find(a => a.name == 'inverted_logic');
    return (
      <div>
        <div><b>Input signal type:</b> {inputSignalType.value}</div>
        <div><b>Output signal type:</b> {outputSignalType.value}</div>
        <div><b>Logic inversion between input and output?</b> {invertedLogic.value ? 'Yes' : 'No'}</div>
      </div>
    )
  }

}



class DeviceViewer extends Component {

  static defaultProps = {
    onFormFound: (form, data) => {},
    showEditLink: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      form: null,
    };
  }

  getFormKeyFromDeviceFunction(func) {
    switch (func) {
      case 'opto_cluster':
        return 'insert-update-opto-cluster'
      case 'opto_system':
        return 'insert-update-opto-system'
      case 'opto_marker':
        return 'insert-update-opto-marker'
      case 'computer':
        return 'insert-update-computer'
      case 'us_probe':
        return 'insert-update-us-probe'
      case 'us_beamformer':
        return 'insert-update-us-beamformer'
      case 'us_probe_skin_interface':
        return 'insert-update-us-portico'
      case 'us_probe_holder':
        return 'insert-update-us-probe-holder'
      case 'signal_converter':
        return 'insert-update-signal-converter'
      default:
        return 'insert-update-signal-converter'
    }
  }

  componentDidMount() {
    let d = this.props.item;
    let forms = this.props.forms;
    let formKey;
    if (d.functions) {
      formKey = this.getFormKeyFromDeviceFunction(d.functions[0]);
    }
    let form;
    if (formKey) {
      form = forms.find(form => form.key == formKey);
      this.setState({ form }, () => this.props.onFormFound(form, {cuid: d.cuid}));
    }
  }

  render() {
    let { item: d, forms, showEditLink } = this.props;
    let form = this.state.form;
    let schema = form ? form.json_schema : undefined;
    let producer = schema ? extractOptionTitle(schema.properties.producer.anyOf, d.producer) : d.producer;
    let header = (
      <div>{`${d.name}`}
        {showEditLink ? <Button bsStyle="link" onClick={this.props.onEdit}>Edit</Button> : null}
      </div>
    );
    return (
      <div>
        <Panel header={header}>
          <div><b>CUID:</b> {d.cuid}</div>
          <div><b>Registered by:</b> {<ResearcherInlineViewer item={typeof d.registered_by == "string" ? {cuid: d.registered_by} : d.registered_by} forms={this.props.forms} />} <i>(on {new Date(d.date_added).toUTCString()})</i></div>
          <div><b>Producer:</b> {producer}</div>
          <div><b>URI:</b> <a href={d.uri} target="_blank">{d.uri}</a></div>
          {(() => {
            if (!d.functions || !schema) return null;
            switch (d.functions[0]) {
              case 'opto_cluster':
                return <OptoCluster attributes={d.attributes} schema={schema} />
              case 'opto_system':
                return <OptoSystem attributes={d.attributes} schema={schema} />
              case 'opto_marker':
                return <OptoMarker attributes={d.attributes} schema={schema} />
              case 'computer':
                return <Computer attributes={d.attributes} schema={schema} />
              case 'us_probe':
                return <USProbe attributes={d.attributes} schema={schema} />
              case 'us_beamformer':
                return <USBeamformer attributes={d.attributes} schema={schema} />
              case 'us_probe_skin_interface':
                return <USProbeSkinInterface attributes={d.attributes} schema={schema} />
              case 'us_probe_holder':
                return <USProbeHolder attributes={d.attributes} schema={schema} />
              case 'signal_converter':
                return <SignalConverter attributes={d.attributes} schema={schema} />
            }
          })()}
        </Panel>
      </div>
    )
  }
}

export default DeviceViewer;
