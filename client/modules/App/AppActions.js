
// Export Constants
export const SET_USER = 'SET_USER';
export const SET_REDIRECT_URL = 'SET_REDIRECT_URL';
export const UPDATE_CACHE = 'UPDATE_CACHE';
export const SET_SHOW_SERVICES = 'SET_SHOW_SERVICES';

// Export Actions
export function setUser(user) {
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
