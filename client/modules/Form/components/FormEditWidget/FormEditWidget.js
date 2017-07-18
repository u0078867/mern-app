import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import JSSForm from '../../../../components/JSSForm/JSSForm';

// Import Style
import styles from './FormEditWidget.css';


const log = type => console.log.bind(console, type);

export class FormEditWidget extends Component {

  static defaultProps = {
    initialForm: {
      title: '',
      json_schema: {},
      ui_schema: {},
      init_data: {},
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.initialForm.title,
      JSONSchema: JSON.stringify(props.initialForm.json_schema, null, 2),
      UISchema: JSON.stringify(props.initialForm.ui_schema, null, 2),
      initData: JSON.stringify(props.initialForm.init_data, null, 2),
      valid: false,
    };
  }

  componentWillMount = () => {
    this.setState(this._parse(this.state));
  }

  saveForm = () => {
    if (this.state.valid) {
      let form = Object.assign({}, this.props.initialForm, {
        title: this.state.title,
        json_schema: this.state._JSONSchema,
        ui_schema: this.state._UISchema,
        init_data: this.state._initData,
      });
      //console.log(form);
      this.props.saveForm(form);
    }
  };

  setTitle = (event) => {
    let title = event.target.value;
    this.setState({title: title});
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

  onChange = ({formData}) => {
    let data = JSON.stringify(formData, null, 2);
    let _formProps = this._parse({...this.state, initData: data})
    this.setState({..._formProps, initData: data});
  }

  onSubmit = ({formData}) => {
    console.log(formData);
  }

  onFormPropsChange = ({valid}) => {
    //console.log(valid);
    this.setState({valid});
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
    return (
      <div className={cls}>
        <div className={styles['input-form-content']}>
          <h2 className={styles['input-form-title']}><FormattedMessage id="editForm" /></h2>
          <input placeholder={this.props.intl.messages.formTitle} className={styles['input-form-field']} onChange={this.setTitle} value={this.state.title} ref="title" />
          <textarea placeholder={this.props.intl.messages.formJSONSchema} className={styles['input-form-field']} ref="JSONSchema" value={this.state.JSONSchema} onChange={this.setJSONSchema} />
          <textarea placeholder={this.props.intl.messages.formUISchema} className={styles['input-form-field']} ref="UISchema" value={this.state.UISchema} onChange={this.setUISchema} />
          <textarea placeholder={this.props.intl.messages.formInitData} className={styles['input-form-field']} ref="InitData" value={this.state.initData} onChange={this.setInitData} />
          <a className={this.state.valid ? styles['form-submit-button'] : styles['form-submit-button-disabled']} href="#" onClick={this.saveForm}><FormattedMessage id="save" /></a>
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
