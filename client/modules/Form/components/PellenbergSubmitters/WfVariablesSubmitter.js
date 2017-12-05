import React, { Component, PropTypes } from 'react';

import {
  Button,
  ButtonToolbar,
} from 'react-bootstrap';

import pubsub from 'pubsub-js';


class WfVariablesSubmitter extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.subm != this.props.subm) {
      let subm = nextProps.subm;
      let form = nextProps.form;
      this.onProceed(subm, form);

    }
  }


  onClick = (event) => {
    this.props.onClick({
      validateForm: true,
    });
  }

  onProceed = (subm, form) => {
    // notify session recorder
    let data = {
      type: "form_submission",
      received_by: "wf_variables_submitter",
      form: {
        title: form.title,
        key: form.key,
      },
      form_data: subm.data,
    };
    pubsub.publishSync('sess-rec-int', {
      command: 'store',
      data: data,
    });
    // call completed callack
    this.props.onCompleted({ message: null, data: subm.data });
    pubsub.publish('wf-engine', {
      command: 'continue',
      variables: subm.data,
    });
  }


  render() {

    return (
      <div>
        <ButtonToolbar>
          <Button type="button" bsStyle="info" id="proceed" onClick={this.onClick}>Proceed with work-flow</Button>
        </ButtonToolbar>
      </div>
    );
  }
}


WfVariablesSubmitter.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default WfVariablesSubmitter;
