import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import JSSForm from '../../../../components/JSSForm/JSSForm';

import callApi from '../../../../util/apiCaller';

// Import Style
import styles from './FormEditWidget.css';


const log = type => console.log.bind(console, type);

export class FormEditWidget extends Component {

  static defaultProps = {
    initialForm: {
      title: '',
      json_schema: undefined,
      ui_schema: undefined,
      init_data: undefined,
      dest_collection: '',
      insert_on_submit: false,
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.initialForm.title,
      JSONSchema: JSON.stringify(props.initialForm.json_schema, null, 2),
      UISchema: JSON.stringify(props.initialForm.ui_schema, null, 2),
      initData: JSON.stringify(props.initialForm.init_data, null, 2),
      destCollection: props.initialForm.dest_collection,
      collections: [],
      insertOnSubmit: props.initialForm.insert_on_submit,
      isFormValid: false,
      isTitleValid: false,
    };
  }

  componentWillMount = () => {
    this.setState(this._parse(this.state));
    this.checkTitle(this.state.title);
  }

  componentDidMount = () => {
    callApi('database/collections').then(res => {
      this.setState({collections: res.collections});
    })
  }

  saveForm = () => {
    if (this.state.isFormValid && this.state.isTitleValid) {
      let form = Object.assign({}, this.props.initialForm, {
        title: this.state.title,
        json_schema: this.state._JSONSchema,
        ui_schema: this.state._UISchema,
        init_data: this.state._initData,
        dest_collection: this.state.destCollection,
        insert_on_submit: this.state.insertOnSubmit,
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

  setJSONSchema = (event) => {
    let schema = event.target.value;
    let _formProps = this._parse({...this.state, JSONSchema: schema})
    this.setState({..._formProps, JSONSchema: schema});
  }

  setUISchema = (event) => {
    let schema = event.target.value;
    let _formProps = this._parse({...this.state, UISchema: schema})
    this.setState({..._formProps, UISchema: schema});
  }

  setInitData = (event) => {
    let data = event.target.value;
    let _formProps = this._parse({...this.state, initData: data})
    this.setState({..._formProps, initData: data});
  }

  setDestCollection = (event) => {
    this.setState({destCollection: event.target.value});
  }

  setInsertOnSubmit = (event) => {
    this.setState({insertOnSubmit: event.target.checked});
  }

  onChange = ({formData}) => {
    let data = JSON.stringify(formData, null, 2);
    let _formProps = this._parse({...this.state, initData: data})
    this.setState({..._formProps, initData: data});
  }

  onSubmit = ({formData}) => {
    console.log(formData);
  }

  onFormPropsChange = ({valid}) => {
    this.setState({isFormValid: valid});
  }

  _parse = (formProps) => {
    let {JSONSchema, UISchema, initData} = formProps;
    try {
      // parse JSON schema
      var _JSONSchema = JSON.parse(JSONSchema);
      // parse UI schema
      var _UISchema = JSON.parse(UISchema);
      // parse init data
      var _initData = JSON.parse(initData);
    } catch(e) {
      //console.log(e);
      var _JSONSchema = undefined;
      var _UISchema = undefined;
      var _initData = undefined;
    }
    return {
      _JSONSchema,
      _UISchema,
      _initData,
    }
  }

  render() {
    const cls = `${styles['input-form']} ${(this.props.showEditForm ? styles.appear : '')}`;
    const valid = this.state.isFormValid && this.state.isTitleValid;
    return (
      <div className={cls}>
        <div className={styles['input-form-content']}>
          <h2 className={styles['input-form-title']}><FormattedMessage id="editForm" /></h2>
          <input placeholder={this.props.intl.messages.formTitle} className={styles['input-form-field']} onChange={this.setTitle} value={this.state.title} ref="title" />
          <textarea placeholder={this.props.intl.messages.formJSONSchema} className={styles['input-form-field']} ref="JSONSchema" value={this.state.JSONSchema} onChange={this.setJSONSchema} />
          <textarea placeholder={this.props.intl.messages.formUISchema} className={styles['input-form-field']} ref="UISchema" value={this.state.UISchema} onChange={this.setUISchema} />
          <textarea placeholder={this.props.intl.messages.formInitData} className={styles['input-form-field']} ref="InitData" value={this.state.initData} onChange={this.setInitData} />
          Target collection: <select placeholder={this.props.intl.messages.formDestCollection} className={styles['input-form-field']} ref="DestCollection" value={this.state.destCollection} onChange={this.setDestCollection} >
          {this.state.collections.map(collection => {
            return <option key={collection.name} value={collection.name}>{collection.name}</option>
          })}
          </select>
          <label className={styles['input-form-field']}><input type="checkbox" onChange={this.setInsertOnSubmit} checked={this.state.insertOnSubmit} ref="InsertOnSubmit" /> Insert on submit</label><br/>
          <a className={valid ? styles['form-submit-button'] : styles['form-submit-button-disabled']} href="#" onClick={this.saveForm}><FormattedMessage id="save" /></a>
        </div>
        <div>
          <h2 className={styles['input-form-title']}><FormattedMessage id="formPreview" /></h2>
          <JSSForm className={styles['input-form-field']} ref="ciao"
            schema={this.state._JSONSchema}
            uiSchema={this.state._UISchema}
            formData={this.state._initData}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
            onFormPropsChange={this.onFormPropsChange}
          />
        </div>
      </div>
    );
  }
}

FormEditWidget.propTypes = {
  saveForm: PropTypes.func.isRequired,
  showEditForm: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FormEditWidget);
