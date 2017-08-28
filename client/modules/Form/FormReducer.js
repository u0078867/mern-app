import { ADD_FORM, ADD_FORMS, DELETE_FORM, TOGGLE_ADD_FORM, SUBMIT_FORM, UPDATE_FORM } from './FormActions';

// Initial State
const initialState = { data: [], showAddForm: false, submitted: [] };

const FormReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FORM :
      return Object.assign({}, state, {
        data: [action.form, ...state.data],
      });

    case ADD_FORMS :
      return Object.assign({}, state, {
        data: action.forms,
      });

    case DELETE_FORM :
      return Object.assign({}, state, {
        data: state.data.filter(form => form.cuid !== action.cuid),
      });

    case TOGGLE_ADD_FORM:
      return Object.assign({}, state, {
        showAddForm: !state.showAddForm,
      });

    case SUBMIT_FORM:
      return Object.assign({}, state, {
        submitted: [action.data, ...state.submitted],
      });

    case UPDATE_FORM:
      return Object.assign({}, state, {
        data: state.data.map(form => form.cuid === action.form.cuid ? action.form : form ),
      });

    default:
      return state;
  }
};

/* Selectors */

// Get all forms
export const getForms = state => state.forms.data;

// Get form by cuid
export const getForm = (state, cuid) => state.forms.data.filter(form => form.cuid === cuid)[0];

// Get showAddForm
export const getShowAddForm = state => /*state.app.showAddPost*/state.forms.showAddForm;

// Get cache
export const getCache = state => state.app.cache;

// Export Reducer
export default FormReducer;
