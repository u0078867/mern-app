import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_SUBM = 'ADD_SUBM';
export const ADD_SUBMS = 'ADD_SUBMS';
export const DELETE_SUBM = 'DELETE_SUBM';
export const ACCEPT_SUBM = 'ACCEPT_SUBM';
export const UPDATE_SUBM = 'UPDATE_SUBM';

// Export Actions
export function addSubm(subm) {
  return {
    type: ADD_SUBM,
    subm,
  };
}

export function addSubmRequest(subm) {
  return (dispatch) => {
    return callApi('subms', 'post', { subm } )
    .then(res => dispatch(addSubm(res.subm)));
  };
}

export function addSubms(subms) {
  return {
    type: ADD_SUBMS,
    subms,
  };
}

export function fetchSubms() {
  return (dispatch) => {
    return callApi('subms').then(res => {
      dispatch(addSubms(res.subms));
    });
  };
}

export function fetchSubm(cuid) {
  return (dispatch) => {
    return callApi(`subms/${cuid}`)
    .then(res => dispatch(addSubm(res.subm)));
  };
}

export function deleteSubm(cuid) {
  return {
    type: DELETE_SUBM,
    cuid,
  };
}

export function deleteSubmRequest(cuid) {
  return (dispatch) => {
    return callApi(`subms/${cuid}`, 'delete')
    .then(() => dispatch(deleteSubm(cuid)))
  };
}

export function acceptSubmRequest(subm) {
  return (dispatch) => {
    let uploadRes = null;
    return callApi('upload/data', 'post', subm)
    .then(res => {
      uploadRes = res;
      return dispatch(deleteSubmRequest(subm.cuid))
    })
    .then(() => uploadRes)
  };
}

export function updateSubmRequest(subm) {
  return (dispatch) => {
    return callApi(`subms/${subm.cuid}`, 'put', { subm })
    .then((res) => dispatch(updateSubm(res.subm)))
  };
}

export function updateSubm(subm) {
  return {
    type: UPDATE_SUBM,
    subm,
  };
}
