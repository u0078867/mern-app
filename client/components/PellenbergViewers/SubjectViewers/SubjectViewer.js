
import React, { PropTypes, Component } from 'react';

import {
  Panel,
  Button,
} from 'react-bootstrap';


class SubjectViewer extends Component {

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
    let formKey = 'insert-update-subject';
    let form;
    if (formKey) {
      form = forms.find(form => form.key == formKey);
      this.setState({ form }, () => this.props.onFormFound(form, {cuid: d.cuid}));
    }
  }

  render() {
    let { item: d, forms, showEditLink } = this.props;
    let header = (
      <div>{d.hospital_id}
        {showEditLink ? <Button bsStyle="link" onClick={this.props.onEdit}>Edit</Button> : null}
      </div>
    );
    return (
      <div>
        <Panel header={header}>
          <div><b>CUID:</b> {d.cuid}</div>
          <div><b>Registered by:</b> {d.registered_by} <i>(on {new Date(d.date_added).toUTCString()})</i></div>
          <div><b>Hospital ID:</b> {d.hospital_id}</div>
        </Panel>
      </div>
    )
  }
}

export default SubjectViewer;
