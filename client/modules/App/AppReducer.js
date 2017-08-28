// Import Actions
import { SET_USER, UPDATE_CACHE } from './AppActions';

// Initial State
const initialState = {
  user: null,
  cache: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER:
      return Object.assign({}, state, {
        user: action.user,
      });

    case UPDATE_CACHE:
      return Object.assign({}, state, {
        cache: action.data,
      });

    default:
      return state;
  }
};

/* Selectors */

// Get user
export const getUser = state => state.app.user;

// Get cache
export const getCache = state => state.app.cache;

// Export Reducer
export default AppReducer;
