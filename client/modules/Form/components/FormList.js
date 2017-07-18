import React, { Component, PropTypes } from 'react';

// Import Components
import FormListItem from './FormListItem/FormListItem';


class FormList extends Component {

  render() {
    return (
      <div className="listView">
        {
          this.props.forms.map(form => (
            <FormListItem
              form={form}
              key={form.cuid}
              onDelete={() => this.props.handleDeleteForm(form.cuid)}
              onUpdate={this.props.handleUpdateForm}
            />
          ))
        }
      </div>
    );
  }

}

FormList.propTypes = {
  forms: PropTypes.arrayOf(PropTypes.shape({
    /*name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,*/
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteForm: PropTypes.func.isRequired,
  handleUpdateForm: PropTypes.func.isRequired,
};

export default FormList;
