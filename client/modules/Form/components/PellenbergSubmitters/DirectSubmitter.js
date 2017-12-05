import React, { Component, PropTypes } from 'react';
//import { Redirect } from 'react-router';
import { connect } from 'react-redux';
//import Helmet from 'react-helmet';
//import { FormattedMessage } from 'react-intl';
//import JSSForm from '../../../../components/JSSForm/JSSForm';
//import OutPortFeeder from '../../../../components/SocketPorts/OutPortFeeder';
//import { Button } from 'react-bootstrap';

import {
  FormGroup,
  FormControl,
  Button,
  ButtonToolbar,
  Alert,
} from 'react-bootstrap';

//import callApi from '../../../../util/apiCaller';

// Import Style
//import styles from '../../components/FormListItem/FormListItem.css';

// Import Actions
//import { fetchForm, submitForm } from '../../FormActions';
import { addSubmRequest, fetchSubm, updateSubmRequest, acceptSubmRequest } from '../../../Subm/SubmActions';

// Import Selectors
//import { getForm, getCache } from '../../FormReducer';

import pubsub from 'pubsub-js';


class DirectSubmitter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      validateForm: true,
      //validateSubm: true,
      fileLink: null,
      showFileLink: false,
      isFormRefreshing: false,
    };
  }

  componentWillReceiveProps (nextProps) {

    if (nextProps.subm != this.props.subm) {

      var setFileLink = (res) => {
        var data = res.data;
        var json = JSON.stringify(data, null, 2);
        var blob = new Blob([json], {type: "application/json"});
        var url  = URL.createObjectURL(blob);
        this.setState({fileLink: url, showFileLink: true});
        return res;
      }

      var onSuccess = res => {
        console.log('done');
        console.log(res);
        // notify session recorder
        let data = {
          type: "form_submission",
          received_by: "direct_submitter",
          form: {
            title: res.data.form.title,
            key: res.data.form.key,
          },
          stored_record: res.data.saved,
        };
        pubsub.publishSync('sess-rec-int', {
          command: 'store',
          data,
        });
        // create message
        var message = (
          <Alert
            bsStyle="success"
            onDismiss={this.props.onCloseMessage}
          >
            <p>Form submitted with <strong>success</strong>!</p><br/>
            <p>Record ID is <strong>{res.data.saved.cuid}</strong>.</p><br/>
            <p>
              <a
                style={{cursor: 'pointer'}}
                onClick={this.onProceed}>
                Proceed
              </a>
              &nbsp;with the work-flow (if using any).
            </p>
          </Alert>
        )
        this.props.onCompleted({ message, data: res.data.saved });
      }

      var onError = err => {
        var message = (
          <Alert
            bsStyle="danger"
            onDismiss={this.props.onCloseMessage}
          >
            <p><strong>Error</strong> while submitting the form! </p>
            <br/>
            <div>
              Possible causes:
              <ul style={{listStylePosition: 'inside'}}>
                <li>Databased validation failed (e.g. change form schema to match target collection schema);</li>
                <li>Impossible to write JSON submission file to server disk;</li>
                <li>Error while creating submission;</li>
              </ul>
              Check technical details here:
            </div>
            <pre>{JSON.stringify(err, null, 2)}</pre>
            <p>
              <a
                style={{cursor: 'pointer'}}
                onClick={this.onProceed}>
                Proceed
              </a>
              &nbsp;with the work-flow.
            </p>
          </Alert>
        )
        this.props.onCompleted({ message });
      }

      console.log(this.state.submitType);
      console.log(nextProps.subm);

      let subm = nextProps.subm;

      switch (this.state.submitType) {
        case 'submit_now':
          this.props.dispatch(addSubmRequest(subm)) // if there are erros in later actions, at least I have it in submissions
          .then(res => this.props.dispatch(updateSubmRequest(res.subm)))
          .then(res => this.props.dispatch(acceptSubmRequest(res.subm)))
          .then(res => setFileLink(res))
          .then(res => onSuccess(res))
          .catch(err => onError(err))
          break;
        case 'submit_later':
          this.props.dispatch(addSubmRequest(subm))
          .then(res => onSuccess(res))
          .catch(err => onError(err))
          break;
      }

    }
  }


  onClick = (event) => {
    let o = {
      submitType: event.target.id,
      validateForm: event.target.id == "submit_now" ? true : false,
      //validateSubm: event.target.id == "submit_now_no_validate" ? false : true,
    }
    this.setState(o);
    this.props.onClick(o);
  }


  onRedirectForms = () => {
    this.context.router.push('/forms');
  }


  onProceed = () => {
    this.props.onCloseMessage();
    this.setState({
      showFileLink: false
    })
    // notify workflow engine
    pubsub.publish('wf-engine', {
      command: 'continue',
    });
  }


  render() {

    return (
      <div>
        <ButtonToolbar>
          <Button type="submit" bsStyle="info" id="submit_now" onClick={this.onClick}>Validate and submit</Button>
          {/*<Button disabled title="Content will be added to submissions. Required fields check will be relaxed." type="submit" bsStyle="info" id="submit_later" onClick={this.onClick}>Save to submissions and review later</Button>*/}
          <Button type="button" bsStyle="info" id="redirect_forms" onClick={this.onRedirectForms}>Back to forms</Button>
          {this.state.showFileLink ? <a href={this.state.fileLink} className="btn btn-link" download="submission.json">Download submitted data</a> : null}
        </ButtonToolbar>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
DirectSubmitter.need = [
  //params => {return fetchForm(params.cuid)},
  //(params, state) => {return getUser(state)},
];

// Retrieve data from store as props
/*function mapStateToProps(state, props) {
  return {

  };
}*/

DirectSubmitter.propTypes = {

};

DirectSubmitter.contextTypes = {
  router: React.PropTypes.object.isRequired
}

//export default connect(mapStateToProps)(FormDetailPage);
export default DirectSubmitter;
