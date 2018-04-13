
import callApi from 'CLIENT_UTIL/apiCaller';

// Export Constants
export const SET_USER = 'SET_USER';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';
export const UPDATE_CACHE = 'UPDATE_CACHE';
export const SET_SHOW_SERVICES = 'SET_SHOW_SERVICES';
export const SET_GLOBAL_VARIABLES = 'SET_GLOBAL_VARIABLES';
export const UPDATE_GLOBAL_VARIABLES = 'UPDATE_GLOBAL_VARIABLES';

// Export Actions
export function setUser(user) {
  if (!user) {
    sessionStorage.removeItem('access_token');
  }
  return {
    type: SET_USER,
    user,
  };
}

export function setRedirectUrl(url) {
  return {
    type: SET_REDIRECT_URL,
    url,
  };
}

export function updateCache(data) {
  return {
    type: UPDATE_CACHE,
    data,
  };
}

export function setShowServices(data) {
  return {
    type: SET_SHOW_SERVICES,
    data,
  };
}

export function setGlobalVariables(data) {
  return {
    type: SET_GLOBAL_VARIABLES,
    data,
  };
}

export function updateGlobalVariables(data) {
  return {
    type: UPDATE_GLOBAL_VARIABLES,
    data,
  };
}

function postLogin(data, dispatch) {
  let { user, token } = data;
  sessionStorage.setItem('access_token', token);
  dispatch(setUser(user));
}

export function loginViaCredentials(data) {
  return (dispatch) => {
    let { username, password } = data;
    return callApi('login/authenticate', 'POST', {
      username,
      password,
    }, true)
    .then(res => {
      console.log(res)
      postLogin(res, dispatch);
    })
  }
}

export function loginViaToken(data) {
  return (dispatch) => {
    let { token } = data;
    return callApi('login/validate-token', 'GET', undefined, false, token)
    .then(res => {
      postLogin(res, dispatch);
    })
  }
}
