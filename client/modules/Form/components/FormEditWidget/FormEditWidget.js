import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import JSSForm from '../../../../components/JSSForm/JSSForm';

import getSubmittersMap from 'SUBMITTERS_PATH/getSubmittersMap';

import callApi from '../../../../util/apiCaller';

import { fillJSON, fillFormJSONProps } from '../../utils/JSONFill';

// Import Style
import styles from './FormEditWidget.css';



const log = type => console.log.bind(console, type);

export class FormEditWidget extends Component {

  static defaultProps = {
    initialForm: {
      title: '',
      key: '',
      json_schema: undefined,
      ui_schema: undefined,
      init_data: undefined,
      dest_collection: undefined,
      dest_collection: undefined,
      submitter: undefined,
      output_variables: {},
      insert_on_submit: false,
    },
    variables: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.initialForm.title,
      key: props.initialForm.key,
      JSONSchema: JSON.stringify(props.initialForm.json_schema, null, 2),
      JSONSchemaMaster: '',
      UISchema: JSON.stringify(props.initialForm.ui_schema, null, 2),
      initData: JSON.stringify(props.initialForm.init_data, null, 2),
      submitter: props.initialForm.submitter,
      submitters:  Object.keys(getSubmittersMap()),
      destCollection: props.initialForm.dest_collection,
      collections: [],
      insertOnSubmit: props.initialForm.insert_on_submit,
      outputVariables: JSON.stringify(props.initialForm.output_variables, null, 2),
      isFormValid: false,
      isTitleValid: false,
      isKeyValid: false,
      isOutputVariablesValid: false,
    };
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
    callApi('database/collections').then(res => {
      this.setState({collections: res.collections}, () => {
        if (this.state.destCollection) {
          this.setDestCollection({target: { value: this.state.destCollection }});
        } else {
          //this.setDestCollection({target: { value: this.state.collections[0].name }});
        }
      });
    });
    this.setJSONSchema({target: { value: this.state.JSONSchema }});
    this.setUISchema({target: { value: this.state.UISchema }});
    this.setInitData({target: { value: this.state.initData }});
    this.setOutputVariables({target: { value: this.state.outputVariables }});
    if (this.state.submitter) {
      this.setSubmitter({target: { value: this.state.submitter }});
    } else {
      this.setSubmitter({target: { value: this.state.submitters[0] }});
    }
    this.checkTitle(this.state.title);
    this.checkKey(this.state.key);
  }

  componentWillReceiveProps = (nextProps) => {
    let {variables, ...props} = nextProps;
    if (variables != this.props.variables) {
      fillFormJSONProps({
        JSONSchema: this.state.parsedJSONSchema,
        UISchema: this.state.parsedUISchema,
        initData: this.state.parsedInitData,
        variables,
      })
      .then(converted => {
        this.setState(converted);
      })
    }
  }

  saveForm = () => {
    if (this.state.isFormValid && this.state.isTitleValid) {
      let form = Object.assign({}, this.props.initialForm, {
        title: this.state.title,
        key: this.state.key,
        json_schema: this.state.parsedJSONSchema,
        ui_schema: this.state.parsedUISchema,
        init_data: this.state.parsedInitData,
        dest_collection: this.state.destCollection,
        submitter: this.state.submitter,
        insert_on_submit: this.state.insertOnSubmit,
        output_variables: this.state.parsedOutputVariables,
      });
      this.props.saveForm(form);
    }
  };

  setTitle = (event) => {
    let title = event.target.value;
    this.setState({ title });
    this.checkTitle(title);
  }

  checkTitle = (title) => {
    let isTitleValid = title.trim().length > 0;
    this.setState({ isTitleValid });
  }

  setKey = (event) => {
    let key = event.target.value;
    this.setState({ key });
    this.checkKey(key);
  }

  checkKey = (key) => {
    let isKeyValid = key.trim().length > 0;
    this.setState({ isKeyValid });
  }

  setJSONSchema = (event) => {
    let schema = event.target.value;
    var _schema = undefined;
    try {
      _schema = JSON.parse(schema);
    } catch (e) {};
    this.setState({
      JSONSchema: schema,
      parsedJSONSchema: _schema,
    }, () => {
      fillJSON(_schema, this.props.variables)
      .then(res => {
        this.setState({
          convertedJSONSchema: res.schema,
        })
      })
    });
  }

  setJSONSchemaMaster = (collectionName) => {
    let collection = this.state.collections.filter(c => c.name === collectionName)[0];
    if (collection) {
      this.setState({
        JSONSchemaMaster: JSON.stringify(collection.JSONSchema, null, 2),
      });
    }
  }

  setUISchema = (event) => {
    let schema = event.target.value;
    var _schema = undefined;
    try {
      _schema = JSON.parse(schema);
    } catch (e) {};
    this.setState({
      UISchema: schema,
      parsedUISchema: _schema,
    }, () => {
      fillJSON(_schema, this.props.variables)
      .then(res => {
        this.setState({
          convertedUISchema: res.schema,
        })
      })
    });
  }

  setInitData = (event) => {
    let data = event.target.value;
    //console.log(data)
    var _data = undefined;
    try {
      _data = JSON.parse(data);
    } catch (e) {};
    this.setState({
      initData: data,
      parsedInitData: _data,
    }, () => {
      fillJSON(_data, this.props.variables)
      .then(res => {
        this.setState({
          convertedInitData: res.schema,
        })
      })
    });
  }

  setOutputVariables = (event) => {
    let data = event.target.value;
    var _data = undefined;
    try {
      _data = JSON.parse(data);
    } catch (e) {};
    this.setState({
      outputVariables: data,
      parsedOutputVariables: _data,
    });
    this.checkOutputVariables(_data);
  }

  checkOutputVariables = (vars) => {
    let isOutputVariablesValid = vars ? true : false;
    this.setState({ isOutputVariablesValid });
  }

  setDestCollection = (event) => {
    this.setState({destCollection: event.target.value });
    this.setJSONSchemaMaster(event.target.value);
  }

  setSubmitter = (event) => {
    this.setState({submitter: event.target.value });
  }

  setInsertOnSubmit = (event) => {
    this.setState({insertOnSubmit: event.target.checked});
  }

  onChange = ({formData}) => {
    this.setState({
      convertedInitData: formData,
    });
  }

  onSubmit = ({formData}) => {
    console.log(formData);
  }

  onFormPropsChange = ({valid}) => {
    this.setState({isFormValid: valid});
  }

  onUpdateFormData = (data) => {
    let formData = Object.assign({}, this.state.convertedInitData, data);
    this.onChange({formData});
  }


  render() {
    if (!this.props.showEditForm) { // important when list, to avoid eager loading
      return null
    }
    const cls = `${styles['input-form']} ${(this.props.showEditForm ? styles.appear : '')}`;
    const valid = this.state.isFormValid && this.state.isTitleValid && this.state.isKeyValid && this.state.isOutputVariablesValid;
    let formContext = {
      formDataFiller: this.onChange,
      cache: this.props.cache,
      updateFormData: this.onUpdateFormData,
    };
    return  (
      <div className={cls}>
        <div className={styles['input-form-content']}>
          <h2 className={styles['input-form-title']}><FormattedMessage id="editForm" /></h2>
          <table className={styles['input-form-table']}><tbody>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.formTitle}:</div></td>
              <td>
                <input placeholder={this.props.intl.messages.formTitle} className={styles['input-form-field']} onChange={this.setTitle} value={this.state.title} ref="title" />
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.formKey}:</div></td>
              <td>
                <input placeholder={this.props.intl.messages.formKey} className={styles['input-form-field']} onChange={this.setKey} value={this.state.key} ref="key" />
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.formJSONSchema}:</div></td>
              <td>
                <textarea placeholder={this.props.intl.messages.formJSONSchema} className={styles['input-form-field']} ref="JSONSchema" value={this.state.JSONSchema} onChange={this.setJSONSchema} />
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.dbJSONSchema + ' (read-only)'}:</div></td>
              <td>
                <textarea readOnly placeholder={this.props.intl.messages.dbJSONSchema + ' (read-only)'} className={styles['input-form-field']} ref="JSONSchemaMaster" value={this.state.JSONSchemaMaster } />
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.formUISchema}:</div></td>
              <td>
                <textarea placeholder={this.props.intl.messages.formUISchema} className={styles['input-form-field']} ref="UISchema" value={this.state.UISchema} onChange={this.setUISchema} />
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.formInitData}:</div></td>
              <td>
                <textarea placeholder={this.props.intl.messages.formInitData} className={styles['input-form-field']} ref="InitData" value={this.state.initData} onChange={this.setInitData} />
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.formDestCollection}</div></td>
              <td>
                <select placeholder={this.props.intl.messages.formDestCollection} className={styles['input-form-field']} ref="DestCollection" value={this.state.destCollection} onChange={this.setDestCollection} >
                {this.state.collections.map(collection => {
                  return <option key={collection.name} value={collection.name}>{collection.name}</option>
                })}
                </select>
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.formSubmitter}</div></td>
              <td>
                <select placeholder={this.props.intl.messages.formSubmitter} className={styles['input-form-field']} ref="Submitter" value={this.state.submitter} onChange={this.setSubmitter} >
                {this.state.submitters.map(submitter => {
                  return <option key={submitter} value={submitter}>{submitter}</option>
                })}
                </select>
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>Insert on submit:</div></td>
              <td>
                <input type="checkbox" onChange={this.setInsertOnSubmit} checked={this.state.insertOnSubmit} ref="InsertOnSubmit" />
              </td>
            </tr>

            <tr>
              <td><div className={styles['input-form-field-label']}>{this.props.intl.messages.formOutputVariables}:</div></td>
              <td>
                <textarea placeholder={this.props.intl.messages.formOutputVariables} className={styles['input-form-field']} ref="outputVariables" value={this.state.outputVariables} onChange={this.setOutputVariables} />
              </td>
            </tr>

          </tbody></table>

          <a className={valid ? styles['form-submit-button'] : styles['form-submit-button-disabled']} style={{cursor: 'pointer'}} onClick={this.saveForm}><FormattedMessage id="save" /></a>

        </div>
        <div>
          <h2 className={styles['input-form-title']}><FormattedMessage id="formPreview" /></h2>
          <JSSForm className={styles['input-form-field']} ref="JSSForm"
            schema={this.state.convertedJSONSchema}
            uiSchema={this.state.convertedUISchema}
            formData={this.state.convertedInitData}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            formContext={formContext}
            onFormPropsChange={this.onFormPropsChange}
          />
        </div>
      </div>
    )

  }
}

FormEditWidget.propTypes = {
  saveForm: PropTypes.func.isRequired,
  showEditForm: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FormEditWidget);
