
import React, { PropTypes, Component } from 'react';

import {
  Panel,
  Button,
} from 'react-bootstrap';

import TooltipViewer from '../TooltipViewer';

import ResearcherInlineViewerRelay from '../ResearcherViewers/ResearcherInlineViewerRelay';
import SubjectInlineViewerRelay from '../SubjectViewers/SubjectInlineViewerRelay';
import DeviceInlineViewerRelay from '../DeviceViewers/DeviceInlineViewerRelay';
import SoftwareInlineViewerRelay from '../SoftwareViewers/SoftwareInlineViewerRelay';
import DataInlineViewer from './DataInlineViewer';
import PublicationInlineViewerRelay from '../PublicationViewers/PublicationInlineViewerRelay';
import ProjectInlineViewerRelay from '../ProjectViewers/ProjectInlineViewerRelay';
import OutputContent from './OutputContent';

import { extractOptionTitle, titleizeOutput } from '../utils/formJSONDataExtract';

import callApi from 'CLIENT_UTIL/apiCaller';

import styles from './ActivityViewer.css';


class ActivityViewer extends Component {

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

  getFormKeyFromActivityType(t) {
    switch (t) {
      case "ajust-camera":
      case "adjust-camera":
        return "adjust-camera";
      case "perform-anthro-measures":
        return "perform-anthro-measures"; // diff
      case "prepare-subject":
        return "prepare-subject";
      case "configure-us":
        return "configure-us";
      case "configure-us-on-subject":
        return "configure-us-on-subject";
      case "configure-opto":
        return "configure-opto";
      case "check-muscle-us-visibility":
        return "check-muscle-us-visibility";
      case "check-markers-visibility":
        return "check-markers-visibility";
      case "move-probe-muscle":
        return "move-probe-muscle";
      case "capture-us":
        return "capture-us";
      case "capture-opto":
        return "capture-opto";
      case "associate-results-to-project":
        return "associate-results-to-project";
      case "associate-results-to-publication":
        return "associate-results-to-publication";
      default:
        return null;
    }
  }

  componentDidMount() {
    let d = this.props.item;
    let forms = this.props.forms;
    let formKey = this.getFormKeyFromActivityType(d.type);
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
    let header = (
      <div>{`${d.name}`}
        {showEditLink ? <Button bsStyle="link" onClick={this.props.onEdit}>Edit</Button> : null}
      </div>
    );
    return (
      <div>
        <Panel header={header}>
          <div><b>CUID:</b> {d.cuid}</div>
          <div><b>Type:</b> {d.type}</div>
          <div><b>Registered by:</b> {<ResearcherInlineViewer item={typeof d.registered_by == "string" ? {cuid: d.registered_by} : d.registered_by} forms={this.props.forms} />} <i>(on {new Date(d.date_added).toUTCString()})</i></div>
          <div><b>Session:</b> {d.session}</div>
          <div><b>Ended on:</b> {new Date(d.datetime_ended).toUTCString()}</div>
          <div>
            {(d.researchers && d.researchers.length) ?
              <div>
                <b>Researchers:</b>
                <ResearchersContent
                  data={d.researchers}
                  dataSchema={schema ? schema.properties.researchers : undefined}
                  forms={forms}
                />
              </div>
            : null}
          </div>
          <div>
            {(d.subjects && d.subjects.length) ?
              <div>
                <b>Subjects:</b>
                <SubjectsContent
                  data={d.subjects}
                  dataSchema={schema ? schema.properties.subjects : undefined}
                  forms={forms}
                />
              </div>
            : null}
          </div>
          <div>
            {(d.devices && d.devices.length) ?
              <div>
                <b>Devices:</b>
                <DevicesContent
                  data={d.devices}
                  dataSchema={schema ? schema.properties.devices : undefined}
                  forms={forms}
                />
              </div>
            : null}
          </div>
          <div>
            {(d.software && d.software.length) ?
              <div>
                <b>Software:</b>
                <SoftwareContent
                  data={d.software}
                  dataSchema={schema ? schema.properties.software : undefined}
                  forms={forms}
                />
              </div>
            : null}
          </div>
          <div>
            {(d.data && d.data.length) ?
              <div>
                <b>Data:</b>
                <DataContent
                  data={d.data}
                  dataSchema={schema ? schema.properties.data : undefined}
                  forms={forms}
                />
              </div>
            : null}
          </div>
          <div>
            {(d.publications && d.publications.length) ?
              <div>
                <b>Publications:</b>
                <PublicationsContent
                  data={d.publications}
                  dataSchema={schema ? schema.properties.publications : undefined}
                  forms={forms}
                />
              </div>
            : null}
          </div>
          <div>
            {(d.projects && d.projects.length) ?
              <div>
                <b>Projects:</b>
                <ProjectsContent
                  data={d.projects}
                  dataSchema={schema ? schema.properties.projects : undefined}
                  forms={forms}
                />
              </div>
            : null}
          </div>
          <div>
            {(d.outputs && d.outputs.length) ?
              <div>
                <b>Outputs:</b>
                <OutputsContent
                  data={d.outputs}
                  dataSchema={schema ? schema.properties.outputs : undefined}
                  forms={forms}
                />
              </div>
            : null}
          </div>
        </Panel>
      </div>
    )
  }
}


class ResearchersContent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let d = this.props.data;
    let forms = this.props.forms;
    return (
      <ul style={{"listStyleType": "disc"}}>
        {d.map(e => {
          let id = e.id || e.data.cuid;
          return (
            <li key={id + Math.random()}>
              <ResearcherInlineViewerRelay item={e.data || {cuid: id}} forms={this.props.forms} />
            </li>
          )
        })}
      </ul>
    )
  }

}

class SubjectsContent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let d = this.props.data;
    let forms = this.props.forms;
    let schema = this.props.dataSchema;
    return (
      <ul style={{"listStyleType": "disc"}}>
        {d.map(e => {
          let areas = '';
          if (e.anatomical_areas) {
            for (let area of e.anatomical_areas) {
              areas = areas + (schema ? extractOptionTitle(schema.items.properties.anatomical_areas.items.anyOf, area) : area) + ', ';
            }
            areas = areas.slice(0, -2);
          }
          let side = '';
          if (e.anatomical_side) {
            side = schema ? extractOptionTitle(schema.items.properties.anatomical_side.anyOf, e.anatomical_side) : e.anatomical_side;
          }
          let id = e.id || e.data.cuid;
          return (
            <li key={id + Math.random()}>
              <SubjectInlineViewerRelay item={e.data || {cuid: id}} forms={this.props.forms} />; <b>areas of interest:</b> {areas}; <b>anatomical side:</b> {side};
            </li>
          )
        })}
      </ul>
    )
  }

}

class DevicesContent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let d = this.props.data;
    let forms = this.props.forms;
    let schema = this.props.dataSchema;
    return (
      <ul style={{"listStyleType": "disc"}}>
        {d.map(e => {
          let roles = '';
          for (let role of e.roles) {
            roles = roles + (schema ? extractOptionTitle(schema.items.properties.roles.items.anyOf, role) : role) + ', ';
          }
          roles = roles.slice(0, -2);
          let id = e.id || e.data.cuid;
          return (
            <li key={id + Math.random()}>
              <DeviceInlineViewerRelay item={e.data || {cuid: id}} forms={this.props.forms} />; <b>roles:</b> {roles};
            </li>
          )
        })}
      </ul>
    )
  }

}

class SoftwareContent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let d = this.props.data;
    let forms = this.props.forms;
    let schema = this.props.dataSchema;
    return (
      <ul style={{"listStyleType": "disc"}}>
        {d.map(e => {
          let roles = '';
          for (let role of e.roles) {
            roles = roles + (schema ? extractOptionTitle(schema.items.properties.roles.items.anyOf, role) : role) + ', ';
          }
          roles = roles.slice(0, -2);
          let id = e.id || e.data.cuid;
          return (
            <li key={id + Math.random()}>
              <SoftwareInlineViewerRelay item={e.data || {cuid: id}} forms={this.props.forms} />; <b>roles:</b> {roles};
            </li>
          )
        })}
      </ul>
    )
  }

}

class PublicationsContent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let d = this.props.data;
    let forms = this.props.forms;
    return (
      <ul style={{"listStyleType": "disc"}}>
        {d.map(e => {
          let id = e.id || e.data.cuid;
          return (
            <li key={id + Math.random()}>
              <PublicationInlineViewerRelay item={e.data || {cuid: id}} forms={this.props.forms} />
            </li>
          )
        })}
      </ul>
    )
  }

}

class ProjectsContent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let d = this.props.data;
    let forms = this.props.forms;
    return (
      <ul style={{"listStyleType": "disc"}}>
        {d.map(e => {
          let id = e.id || e.data.cuid;
          return (
            <li key={id + Math.random()}>
              <ProjectInlineViewerRelay item={e.data || {cuid: id}} forms={this.props.forms} />
            </li>
          )
        })}
      </ul>
    )
  }

}

class DataContent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let d = this.props.data;
    let forms = this.props.forms;
    let schema = this.props.dataSchema;
    return (
      <ul style={{"listStyleType": "disc"}}>
        {d.map(e => {
          let roles = '';
          for (let role of e.roles) {
            roles = roles + (schema ? extractOptionTitle(schema.items.properties.roles.items.anyOf, role) : role) + ', ';
          }
          roles = roles.slice(0, -2);
          let id = e.id || e.data.cuid;
          return (
            <li key={id + Math.random()}>
              <DataInlineViewer item={e.data || {cuid: id}} forms={this.props.forms} />; <b>roles:</b> {roles};
            </li>
          )
        })}
      </ul>
    )
  }

}

class OutputsContent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let d = this.props.data;
    let forms = this.props.forms;
    let schema = this.props.dataSchema;
    return (
      <ul style={{"listStyleType": "circle"}}>
        {d.map(output => {
          let o = schema ? titleizeOutput(output, schema) : output;
          return (
            <li key={o.cuid}><b>{o.name}:</b>
              <div className={styles['nested']}>
                <OutputContent
                  item={o}
                  forms={forms}
                />
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

}


export default ActivityViewer;
