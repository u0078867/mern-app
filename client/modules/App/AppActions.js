
// Export Constants
export const SET_USER = 'SET_USER';
export const UPDATE_CACHE = 'UPDATE_CACHE';

// Export Actions
export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function updateCache(data) {
  return {
    type: UPDATE_CACHE,
    data,
  };
}
