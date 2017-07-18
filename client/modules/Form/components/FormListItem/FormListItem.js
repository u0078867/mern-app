import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import FormEditWidget from '../FormEditWidget/FormEditWidget';

// Import Style
import styles from './FormListItem.css';

class FormListItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditShown: false,
    };
  }

  showEdit = () => {
    this.setState({isEditShown: !this.state.isEditShown});
  }


  render() {
    return (
      <div className={styles['single-form']}>
        <h3 className={styles['form-title']}>
          <Link to={`/forms/${this.props.form.slug}-${this.props.form.cuid}`} >
            {this.props.form.title}
          </Link>
        </h3>
        <p className={styles['form-action']}><a href="#" onClick={this.props.onDelete}><FormattedMessage id="deleteForm" /></a></p>
        <p className={styles['form-action']}><a href="#" onClick={this.showEdit}><FormattedMessage id="editForm" /></a></p>
        <FormEditWidget
          saveForm={this.props.onUpdate}
          showEditForm={this.state.isEditShown}
          initialForm={this.props.form}
        />
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
