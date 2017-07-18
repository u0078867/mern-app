import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Style

// Import Components
import FormList from '../../components/FormList';
import FormEditWidget from '../../components/FormEditWidget/FormEditWidget';

// Import Actions
import { addFormRequest, fetchForms, deleteFormRequest, toggleAddForm, updateFormRequest } from '../../FormActions';

// Import Selectors
import { getForms, getShowAddForm } from '../../FormReducer';

class FormListPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchForms());
  }

  handleDeleteForm = cuid => {
    if (confirm('Do you want to delete this form')) { // eslint-disable-line
      this.props.dispatch(deleteFormRequest(cuid));
    }
  };

  handleUpdateForm = form => {
    if (confirm('Do you want to update this form')) { // eslint-disable-line
      this.props.dispatch(updateFormRequest(form));
    }
  };

  handleAddForm = (form) => {
    this.props.dispatch(toggleAddForm());
    console.log('handleAddForm');
    console.log(form);
    this.props.dispatch(addFormRequest(form));
  };

  handleToggleAddForm = () => {
    this.props.dispatch(toggleAddForm());
  };

  render() {
    return (
      <div>
        {/*<a className={styles['add-post-button']} href="#" onClick={props.toggleAddPost}><FormattedMessage id="addPost" /></a>*/}
        <a href="#" onClick={this.handleToggleAddForm}>Add form</a>
        <FormEditWidget saveForm={this.handleAddForm} showEditForm={this.props.showAddForm} />
        <FormList
          handleDeleteForm={this.handleDeleteForm}
          handleUpdateForm={this.handleUpdateForm}
          forms={this.props.forms}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
FormListPage.need = [() => { return fetchForms(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddForm: getShowAddForm(state),
    forms: getForms(state),
  };
}

FormListPage.propTypes = {
  forms: PropTypes.arrayOf(PropTypes.shape({
    //name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    //content: PropTypes.string.isRequired,
  })).isRequired,
  showAddForm: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

FormListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(FormListPage);
