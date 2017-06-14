import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_FORM = 'ADD_FORM';
export const ADD_FORMS = 'ADD_FORMS';
export const DELETE_FORM = 'DELETE_FORM';
export const TOGGLE_ADD_FORM = 'TOGGLE_ADD_FORM';
export const SUBMIT_FORM = 'SUBMIT_FORM';
export const UPDATE_FORM = 'UPDATE_FORM';

// Export Actions
export function addForm(form) {
  return {
    type: ADD_FORM,
    form,
  };
}

export function addFormRequest(form) {
  return (dispatch) => {
    return callApi('forms', 'post', { form } )
    .then(res => dispatch(addForm(res.form)));
  };
}

export function addForms(forms) {
  return {
    type: ADD_FORMS,
    forms,
  };
}

export function fetchForms() {
  return (dispatch) => {
    return callApi('forms').then(res => {
      dispatch(addForms(res.forms));
    });
  };
}

export function fetchForm(cuid) {
  return (dispatch) => {
    return callApi(`forms/${cuid}`).then(res => dispatch(addForm(res.form)));
  };
}

export function deleteForm(cuid) {
  return {
    type: DELETE_FORM,
    cuid,
  };
}

export function deleteFormRequest(cuid) {
  return (dispatch) => {
    return callApi(`forms/${cuid}`, 'delete').then(() => dispatch(deleteForm(cuid)));
  };
}

export function toggleAddForm() {
  return {
    type: TOGGLE_ADD_FORM,
  };
}

export function submitForm(data) {
  console.log('submiting')
  return (dispatch) => {
    return callApi('form/upload/data', 'post', data)
    /*.then(res => {
      type: SUBMIT_FORM,
      data: res.data
    });*/
  };
}

export function updateFormRequest(form) {
  return (dispatch) => {
    return callApi(`forms/${form.cuid}`, 'put', { form })
    .then((res) => dispatch(updateForm(res.form)))
  };
}

export function updateForm(form) {
  return {
    type: UPDATE_FORM,
    form,
  };
}
