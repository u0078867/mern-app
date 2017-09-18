import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import JSSForm from '../../../../components/JSSForm/JSSForm';
import OutPortFeeder from '../../../../components/SocketPorts/OutPortFeeder';
import Submitter from './FIBErSubmitter';
import { Button } from 'react-bootstrap';

import callApi from '../../../../util/apiCaller';

// Import Style
import styles from '../../components/FormListItem/FormListItem.css';

// Import Actions
import { fetchForm, submitForm } from '../../FormActions';
import { addSubmRequest, fetchSubm, updateSubmRequest, acceptSubmRequest } from '../../../Subm/SubmActions';

// Import Selectors
import { getForm, getCache } from '../../FormReducer';


class FormDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.form.init_data,
      validateForm: true,
      validateSubm: true,
      //fileLink: null,
      //showFileLink: false,
      isFormRefreshing: false,
    };
    this.sender = new OutPortFeeder({dataOutPort: 'wf-task-exit'});
  }

  componentDidMount() {
    console.log(this.props.params.cuid)
    this.props.dispatch(fetchForm(this.props.params.cuid));
  }

  onSubmit = ({formData}) => {
    console.log(this.props.form)
    console.log('submitting...');
    console.log(this.state.submitType);
    let subm = {
      form: this.props.form._id,
      data: formData,
      validate_before_insert: this.state.validateSubm,
    };
    this.setState({
      subm: subm
    });
  }

  onChange = ({formData}) => {
    this.setState({
      formData: formData
    });
  }

  onUpdateFormData = (data) => {
    let formData = Object.assign({}, this.state.formData, data);
    this.onChange({formData});
  }

  onClick = (o) => {
    this.setState(o);
  }


  render() {
    /*
    NOTE:
    I have used a link for file dowload in place of a button, since it has
    the "dowload" prop (that a button does not have) to force download.
    To make it appear as a "btn-link" class, it is luckily possible to apply
    the button style at the link.
    */
    let formContext = {
      cache: this.props.cache,
      updateFormData: this.onUpdateFormData,
    };
    return (
      <div>
        <Helmet title={this.props.form.title} />
        <div className={`${styles['single-form']} ${styles['form-detail']}`}>
          <h3 className={styles['form-title']}>{this.props.form.title}</h3>
        </div>
        <JSSForm
          schema={this.props.form.json_schema}
          uiSchema={this.props.form.ui_schema}
          formData={this.state.formData}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          listenToInternalEvents={true}
          formContext={formContext}
          noHtml5Validate={!this.state.validateForm}
          noValidate={!this.state.validateForm}
          inRefresh={this.state.isFormRefreshing}
          postRefreshCallback={() => this.setState({isFormRefreshing: false})}
        >
          <Submitter {...this.props}
            subm={this.state.subm}
            onClick={this.onClick}
            policy={this.props.form.submitter}
          />
        </JSSForm>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
FormDetailPage.need = [
  params => {return fetchForm(params.cuid)},
  //(params, state) => {return getUser(state)},
];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    form: getForm(state, props.params.cuid),
    cache: getCache(state),
    redirectUrl: props.location.query.red
  };
}

FormDetailPage.propTypes = {
  form: PropTypes.shape({
    //name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    //content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

FormDetailPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(FormDetailPage);
