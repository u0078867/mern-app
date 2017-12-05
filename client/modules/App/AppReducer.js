// Import Actions
import {
  SET_USER,
  SET_REDIRECT_URL,
  UPDATE_CACHE,
  SET_SHOW_SERVICES,
  SET_GLOBAL_VARIABLES,
  UPDATE_GLOBAL_VARIABLES,
} from './AppActions';

// Initial State
const initialState = {
  user: null,
  redirectUrl: '/login',
  cache: {},
  showServices: true,
  globalVariables: {},
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER:
      return Object.assign({}, state, {
        user: action.user,
      });

    case SET_REDIRECT_URL:
      return Object.assign({}, state, {
        redirectUrl: action.url,
      });

    case UPDATE_CACHE:
      return Object.assign({}, state, {
        cache: Object.assign({}, state.cache, action.data),
      });

    case SET_SHOW_SERVICES:
      return Object.assign({}, state, {
        showServices: action.data,
      });

    case SET_GLOBAL_VARIABLES:
      return Object.assign({}, state, {
        globalVariables: action.data,
      });

    case UPDATE_GLOBAL_VARIABLES:
      return Object.assign({}, state, {
        globalVariables: Object.assign({}, state.globalVariables, action.data),
      });

    default:
      return state;
  }
};

/* Selectors */

// Get user
export const getUser = state => state.app.user;

// Get user
export const getRedirectUrl = state => state.app.redirectUrl;

// Get cache
export const getCache = state => state.app.cache;

// Get show services
export const getShowServices = state => state.app.showServices;

// Get global variables
export const getGlobalVariables = state => state.app.globalVariables;

// Export Reducer
export default AppReducer;
