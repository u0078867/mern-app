import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import FormEditWidget from '../FormEditWidget/FormEditWidget';
import {
  Alert,
} from 'react-bootstrap';

// Import Style
import styles from './FormListItem.css';

class FormListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditShown: false,
      showMessage: false,
      message: '',
      isError: false,
    };
  }

  showEdit = () => {
    this.setState({isEditShown: !this.state.isEditShown});
  }

  onFormSavingAttempt = (err, res) => {
    if (err) {
      this.setState({
        message: err,
        isError: true,
        showMessage: true
      });
    } else {
      this.setState({
        message: '',
        isError: false,
        showMessage: true
      });
    }
  }


  render() {
    var messageAlert = null;
    var message = null;
    if (this.state.isError) {
      message = <div>
        <p><strong>Error</strong> while saving the form:</p>
        <pre>{JSON.stringify(this.state.message, null, 2)}</pre>
      </div>
    } else {
      message = <p>Form saved with <strong>success</strong>!</p>
    }
    if (this.state.showMessage) {
      messageAlert =
        <Alert bsStyle={this.state.isError ? "danger" : "success"} onDismiss={() => this.setState({showMessage: false})}>
          {message}
        </Alert>
    }
    return (
      <div className={styles['single-form']}>
        <h3 className={styles['form-title']}>
          <Link to={`/forms/${this.props.form.slug}-${this.props.form.cuid}`} >
            {this.props.form.title}
          </Link>
        </h3>
        <p className={styles['form-action']}><a style={{cursor: 'pointer'}} onClick={this.props.onDelete}><FormattedMessage id="deleteForm" /></a></p>
        <p className={styles['form-action']}><a style={{cursor: 'pointer'}} onClick={this.showEdit}><FormattedMessage id="editForm" /></a></p>
        <FormEditWidget
          saveForm={form => this.props.onUpdate(form, this.onFormSavingAttempt)}
          showEditForm={this.state.isEditShown}
          initialForm={this.props.form}
          cache={this.props.cache}
          variables={this.props.globalVariables}
          forms={this.props.forms}
        />
        {messageAlert}
        <hr className={styles.divider} />
      </div>
    );
  }

}

FormListItem.propTypes = {
  form: PropTypes.shape({
    /*name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,*/
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default FormListItem;
