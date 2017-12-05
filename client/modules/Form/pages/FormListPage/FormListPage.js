import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Style

// Import Components
import FormList from '../../components/FormList';
import FormEditWidget from '../../components/FormEditWidget/FormEditWidget';
import {
  Navbar,
  Nav,
  NavItem,
  FormGroup,
  FormControl,
  Button,
  Alert,
} from 'react-bootstrap';

// Import Actions
import { addFormRequest, fetchForms, deleteFormRequest, toggleAddForm, updateFormRequest } from '../../FormActions';

// Import Selectors
import { getForms, getShowAddForm, getCache } from '../../FormReducer';
import { getGlobalVariables } from 'MODULE_APP/AppReducer';


class FormListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      forms: [],
      showMessage: false,
      message: null,
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchForms())
    .then(() => this.filterForms(this.props.forms, this.state.searchQuery));
  }

  componentWillReceiveProps(nextProps) {
    this.filterForms(nextProps.forms, this.state.searchQuery)
  }

  handleDeleteForm = cuid => {
    this.props.dispatch(deleteFormRequest(cuid))
    .then(res => {
      this.setState({
        showMessage: true,
        message: (
          <Alert
            bsStyle="success"
            onDismiss={() => this.setState({showMessage: false})}
          >
            <p>Form deleted with <strong>success</strong>!</p>
          </Alert>
        )
      });
    })
    .catch(err => {
      this.setState({
        showMessage: true,
        message: (
          <Alert
            bsStyle="danger"
            onDismiss={() => this.setState({showMessage: false})}
          >
            <p><strong>Error</strong> while deleting the form:</p>
            <pre>{JSON.stringify(err, null, 2)}</pre>
          </Alert>
        )
      });
    })
  };

  handleUpdateForm = (form, cb) => {
    this.props.dispatch(updateFormRequest(form))
    .then(res => cb(null, true))
    .catch(err => cb(err))
  };

  handleAddForm = (form) => {
    this.props.dispatch(addFormRequest(form))
    .then(res => {
      this.props.dispatch(toggleAddForm());
      this.setState({
        showMessage: true,
        message: (
          <Alert
            bsStyle="success"
            onDismiss={() => this.setState({showMessage: false})}
          >
            <p>Form saved with <strong>success</strong>!</p>
          </Alert>
        )
      });
    })
    .catch(err => {
      this.setState({
        showMessage: true,
        message: (
          <Alert
            bsStyle="danger"
            onDismiss={() => this.setState({showMessage: false})}
          >
            <p><strong>Error</strong> while saving the form:</p>
            <pre>{JSON.stringify(err, null, 2)}</pre>
          </Alert>
        )
      });
    })
  };

  handleToggleAddForm = () => {
    this.props.dispatch(toggleAddForm());
  };

  onFilterForms = (event) => {
    var query = event.target.value;
    this.setState({
      searchQuery: query,
    })
    this.filterForms(this.props.forms, query);
  }

  filterForms = (forms, query) => {
    let filteredForms = forms.filter(form => {
      var pattern = new RegExp(query, "gi");
      return pattern.test(form.title);
    })
    this.setState({ forms: filteredForms });
  }

  render() {
    var messageAlert = null;
    return (
      <div>
        <Navbar>
          <Nav>
            <NavItem eventKey={1} onClick={this.handleToggleAddForm}>Add form</NavItem>
          </Nav>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" onChange={this.onFilterForms} />
              </FormGroup>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        {/*<a style={{cursor: 'pointer'}} onClick={this.handleToggleAddForm}>Add form</a>*/}
        <FormEditWidget saveForm={this.handleAddForm} showEditForm={this.props.showAddForm} />
        {this.state.showMessage ? this.state.message : null}
        <FormList
          handleDeleteForm={this.handleDeleteForm}
          handleUpdateForm={this.handleUpdateForm}
          forms={this.state.forms}
          cache={this.props.cache}
          globalVariables={this.props.globalVariables}
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
    cache: getCache(state),
    globalVariables: getGlobalVariables(state),
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
