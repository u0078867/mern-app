import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import JSSForm from '../../../../components/JSSForm/JSSForm';
import OutPortFeeder from '../../../../components/SocketPorts/OutPortFeeder';

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
    };
    this.sender = new OutPortFeeder({dataOutPort: 'wf-task-exit'});
    //console.log(props.user);
  }

  componentDidMount() {
    console.log(this.props.params.cuid)
    this.props.dispatch(fetchForm(this.props.params.cuid));
  }

  onSubmit = ({formData}) => {
    console.log('submitting...');
    console.log(this.state.submitType);
    let subm = {
      form: this.props.form._id,
      data: formData,
    };
    var postSubmit = () => {
      //this.context.router.push('/');
      this.context.router.push(this.props.redirectUrl);
      this.sender.send('exited');
    }
    switch (this.state.submitType) {
      case 'submit_later':
        this.props.dispatch(addSubmRequest(subm))
        .then(() => postSubmit());
        break;
      case 'submit_now':
        this.props.dispatch(addSubmRequest(subm)) // if there are erros in later actions, at least I have it in submissions
        .then(res => this.props.dispatch(updateSubmRequest(res.subm)))
        .then(res => this.props.dispatch(acceptSubmRequest(res.subm)))
        .then(() => postSubmit());
        break;
    }
  }

  onChange = ({formData}) => {
    this.setState({
      formData: formData
    });
  }

  onClick = (event) => {
    this.setState({
      submitType: event.target.id,
      validateForm: event.target.id == "submit_now" ? true : false,
    })
  }

  onUpdateFormData = (data) => {
    let formData = Object.assign({}, this.state.formData, data);
    this.onChange({formData});
  }

  render() {
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
        >
          <button type="submit" className="btn btn-info" id="submit_now" onClick={this.onClick}>Send to database</button>
          {/*<button title="Content will be added to submissions. Required fields check will be relaxed." type="submit" className="btn btn-info" id="submit_later" onClick={this.onClick}>Save to submissions and review later</button>*/}
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
