import React, { Component, PropTypes } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import JSSForm from '../../components/JSSForm/JSSForm';

// Import Style
import styles from '../../components/FormListItem/FormListItem.css';

// Import Actions
import { fetchForm, submitForm } from '../../FormActions';
import { addSubmRequest } from '../../../Subm/SubmActions';

// Import Selectors
import { getForm } from '../../FormReducer';


class FormDetailPage extends Component {

  constructor(props) {
    super(props);
  }

  onSubmit = ({formData}) => {
    let subm = {
      form: this.props.form._id,
      data: formData,
    };
    this.props.dispatch(addSubmRequest(subm))
    .then(this.context.router.push('/forms'));
  }

  render() {
    return (
      <div>
        <Helmet title={this.props.form.title} />
        <div className={`${styles['single-form']} ${styles['form-detail']}`}>
          <h3 className={styles['form-title']}>{this.props.form.title}</h3>
        </div>
        <JSSForm
          schema={this.props.form.json_schema}
          uiSchema={this.props.form.ui_schema}
          formData={this.props.form.init_data}
          onSubmit={this.onSubmit}
        >
          <button type="submit">Submit (accept later)</button>
        </JSSForm>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
FormDetailPage.need = [params => {
  return fetchForm(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    form: getForm(state, props.params.cuid),
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
