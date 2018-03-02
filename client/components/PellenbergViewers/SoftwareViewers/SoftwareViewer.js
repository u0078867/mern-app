
import React, { PropTypes, Component } from 'react';

import {
  Panel,
  Button,
} from 'react-bootstrap';

import { extractOptionTitle } from '../utils/formJSONDataExtract';


class SoftwareViewer extends Component {

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

  componentDidMount() {
    let d = this.props.item;
    let forms = this.props.forms;
    let formKey = 'insert-update-software';
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
          <div><b>Registered by:</b> {d.registered_by} <i>(on {new Date(d.date_added).toUTCString()})</i></div>
          <div><b>Producer:</b> {producer}</div>
          <div><b>Version:</b> {d.version}</div>
          <div><b>URI:</b> <a href={d.uri} target="_blank">{d.uri}</a></div>
        </Panel>
      </div>
    )
  }
}

export default SoftwareViewer;
