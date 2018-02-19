import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import JSSForm from '../../../../components/JSSForm/JSSForm';
import OutPortFeeder from '../../../../components/SocketPorts/OutPortFeeder';
import getSubmittersMap from 'SUBMITTERS_PATH/getSubmittersMap';
import { Button } from 'react-bootstrap';

import _ from 'lodash';

import callApi from '../../../../util/apiCaller';

import { fillFormJSONProps } from '../../utils/JSONFill';

// Import Style
import styles from '../../components/FormListItem/FormListItem.css';

// Import Actions
import { fetchForm, submitForm } from '../../FormActions';
import { addSubmRequest, fetchSubm, updateSubmRequest, acceptSubmRequest } from '../../../Subm/SubmActions';
import { updateGlobalVariables } from 'MODULE_APP/AppActions';

// Import Selectors
import { getForm, getForms, getCache } from '../../FormReducer';
import { getGlobalVariables } from 'MODULE_APP/AppReducer';

//var Submitter = null;

class FormDetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      convertedJSONSchema: undefined,
      convertedUISchema: undefined,
      convertedInitData: undefined,
      formData: undefined,
      //validateSubm: true,
      validateForm: true,
      isFormRefreshing: false,
      message: null,
      showMessage: false,
      submitter: null,
      localVariables: {},
    };
    this.sender = new OutPortFeeder({dataOutPort: 'wf-task-exit'});
  }

  initializeForm = (props, cb) => {
    console.log(props)
    console.log('initializing form')
    let variables = Object.assign({}, props.variables, this.state.localVariables);
    console.log(variables)
    fillFormJSONProps({
      JSONSchema: props.form.json_schema,
      UISchema: props.form.ui_schema,
      initData: props.form.init_data,
      variables: variables
    })
    .then(converted => {
      this.setState(converted, () => {
        console.log(converted)
        this.setFormData(props);
        if (cb) cb();
      })
    })
  }

  initializeFormNoInitData = (props, cb) => {
    console.log(props)
    console.log('initializing form (no init data)')
    let variables = Object.assign({}, props.variables, this.state.localVariables);
    fillFormJSONProps({
      JSONSchema: props.form.json_schema,
      UISchema: props.form.ui_schema,
      initData: {},
      variables: variables
    })
    .then(converted => {
      let { convertedJSONSchema, convertedUISchema} = converted;
      console.log(convertedUISchema)
      this.setState({
        convertedJSONSchema,
        convertedUISchema,
      }, () => {
        if (cb) cb();
      })
    })
  }

  componentWillMount() {
    this.initializeForm(this.props);
    this.setSubmitter(this.props);
  }

  setSubmitter = (props) => {
    let submitter = getSubmittersMap()[props.form.submitter];
    this.setState({ submitter });
  }

  setFormData = (props) => {
    var formData = this.state.convertedInitData;
    let initData = props.initData;
    console.log(formData);
    console.log(initData);
    if (initData) {
      if (typeof(initData) == typeof(formData)) {
        if (typeof(initData) == 'object') {
          // merge object or array data
          formData = Object.assign(formData, initData);
        } else {
          // overwrite data
          formData = initData;
        }
      } else {
        console.log('initial data type passed via URL mismatches form data type');
      }
    }
    this.setState({ formData });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.form)
    if (nextProps.form.cuid != this.props.form.cuid) {
      this.setState({
        validateForm: true,
        message: null,
        showMessage: false,
        isFormRefreshing: true,
        localVariables: {},
      })
    }
    else if (nextProps.search != this.props.search) {
      this.setState({
        validateForm: true,
        message: null,
        showMessage: false,
        isFormRefreshing: true,
        localVariables: {},
      })

    }
  }

  componentDidMount() {
    this.props.dispatch(fetchForm(this.props.params.cuid));
  }

  onSubmit = ({formData}) => {
    console.log(this.props.form);
    console.log('submitting...');
    let subm = {
      form: this.props.form._id,
      data: formData,
      //validate_before_insert: this.state.validateSubm,
      validate_before_insert: true,
    };
    this.setState({
      subm: subm
    });
  }

  onChange = ({formData}) => {
    console.log(formData)
    this.setState({
      formData: formData
    });
  }

  onUpdateFormData = (data) => {
    let formData = Object.assign({}, this.state.formData, data);
    console.log(formData)
    this.onChange({formData});
  }

  onUpdateLocalVariables = (vars, cb) => {
    let localVariables = Object.assign({}, this.state.localVariables, vars);
    console.log(localVariables);
    this.setState({ localVariables }, () => {
      this.initializeFormNoInitData(this.props, cb);
    });
  }

  onClick = (o) => {
    this.setState(o, () => {
      this.hiddenSubmitter.click();
    });
  }

  onCompleted = ({ message, data }) => {
    // show message
    this.setState({
      //isFormRefreshing: true,
      showMessage: true,
      message,
    });
    // update global variables
    let outputVariables = this.props.form.output_variables;
    let updates = {};
    for (var v in outputVariables) {
      updates[v] = _.get(data, outputVariables[v].path);
    }
    this.props.dispatch(updateGlobalVariables(updates));
  }

  onCloseMessage = () => {
    this.setState({showMessage: false});
  }

  postRefreshCallback = () => {
    this.setState({isFormRefreshing: false}, () => {
      this.initializeForm(this.props);
      this.setSubmitter(this.props);
    });
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
      updateLocalVariables: this.onUpdateLocalVariables,
      forms: this.props.forms,
    };
    const Submitter = this.state.submitter;
    return (
      <div>
        <Helmet title={this.props.form.title} />
        <div className={`${styles['single-form']} ${styles['form-detail']}`}>
          <h3 className={styles['form-title']}>{this.props.form.title}</h3>
        </div>
        <JSSForm
          schema={this.state.convertedJSONSchema}
          uiSchema={this.state.convertedUISchema}
          formData={this.state.formData}
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          listenToInternalEvents={true}
          formContext={formContext}
          noHtml5Validate={!this.state.validateForm}
          noValidate={!this.state.validateForm}
          inRefresh={this.state.isFormRefreshing}
          postRefreshCallback={this.postRefreshCallback}
        >
          <button ref={btn => this.hiddenSubmitter = btn} style={{'display': 'none'}} />
        </JSSForm>
        { !Submitter ? null :
          <Submitter
          dispatch={this.props.dispatch}
          subm={this.state.subm}
          form={this.props.form}
          onClick={this.onClick}
          onCompleted={this.onCompleted}
          onCloseMessage={this.onCloseMessage}
        /> }
        <br/>
        {this.state.showMessage ? this.state.message : null}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
FormDetailPage.need = [
  params => {return fetchForm(params.cuid)},
];


function parseInitDataFromURL(d) {
  if (!d) {
    return undefined;
  }
  let initData = undefined;
  try {
    initData = JSON.parse(atob(d));
  } catch (e) {
    console.log(e);
  }
  console.log(initData)
  return initData;
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  console.log(props.location)
  return {
    form: getForm(state, props.params.cuid),
    forms: getForms(state), // to be passed to JSSForm widgets via context
    cache: getCache(state),
    initData: parseInitDataFromURL(props.location.query.d),
    search: props.location.search,
    variables: getGlobalVariables(state),
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
