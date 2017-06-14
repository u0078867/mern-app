import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import JSSForm from '../JSSForm/JSSForm';
//import SubjectSearch from '../JSSForm/SubjectSearch'; // temp

// Import Style
import styles from './FormCreateWidget.css';

export class FormCreateWidget extends Component {

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
    console.log(props);
    this.state = {
      title: props.initialForm.title,
      JSONSchema: props.initialForm.json_schema,
      UISchema: props.initialForm.ui_schema,
      initData: props.initialForm.init_data,
    };
  }

  addForm = () => {
    const titleRef = this.refs.title;
    const JSONSchemaRef = this.refs.JSONSchema;
    const UISchemaRef = this.refs.UISchema;
    const InitDataRef = this.refs.InitData;
    if (titleRef.value && JSONSchemaRef.value && UISchemaRef.value && InitDataRef.value) {
      let form = {
        title: titleRef.value,
        json_schema: JSONSchemaRef.value,
        ui_schema: UISchemaRef.value,
        init_data: InitDataRef.value,
      }
      this.props.addForm(form);
      titleRef.value = JSONSchemaRef.value = UISchemaRef.value = InitDataRef.value = '';
    }
  };

  setTitle = (event) => {
    let title = event.target.value;
    this.setState({title: title});
  }

  setJSONSchema = (event) => {
    let schema = {};
    try {
      schema = JSON.parse(event.target.value);
    } catch(err) {};
    this.setState({JSONSchema: schema});
  }

  setUISchema = (event) => {
    let schema = {};
    try {
      schema = JSON.parse(event.target.value);
    } catch(err) {};
    this.setState({UISchema: schema});
  }

  setInitData = (event) => {
    let data = undefined;
    try {
      data = JSON.parse(event.target.value);
      console.log(data);
    } catch(err) {};
    this.setState({initData: data});
  }

  onSubmit = ({formData}) => {
    console.log(formData);
  }

  render() {
    const cls = `${styles['input-form']} ${(this.props.showAddForm ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['input-form-content']}>
          <h2 className={styles['input-form-title']}><FormattedMessage id="editForm" /></h2>
          <input placeholder={this.props.intl.messages.formTitle} className={styles['input-form-field']} onChange={this.setTitle} value={this.state.title} ref="title" />
          <textarea placeholder={this.props.intl.messages.formJSONSchema} className={styles['input-form-field']} ref="JSONSchema" value={JSON.stringify(this.state.JSONSchema)} onChange={this.setJSONSchema} />
          <textarea placeholder={this.props.intl.messages.formUISchema} className={styles['input-form-field']} ref="UISchema" value={JSON.stringify(this.state.UISchema)} onChange={this.setUISchema} />
          <textarea placeholder={this.props.intl.messages.formInitData} className={styles['input-form-field']} ref="InitData" value={JSON.stringify(this.state.initData)} onChange={this.setInitData} />
          <a className={styles['form-submit-button']} href="#" onClick={this.addForm}><FormattedMessage id="save" /></a>
        </div>
        <div>
          <div>Preview:</div>
          <JSSForm
            schema={this.state.JSONSchema}
            uiSchema={this.state.UISchema}
            formData={this.state.initData}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

FormCreateWidget.propTypes = {
  addForm: PropTypes.func.isRequired,
  showAddForm: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(FormCreateWidget);
