// Import Actions
import { SET_USER, SET_REDIRECT_URL, UPDATE_CACHE, SET_SHOW_SERVICES } from './AppActions';

// Initial State
const initialState = {
  user: null,
  redirectUrl: '/login',
  cache: {},
  showServices: true,
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
        cache: action.data,
      });

    case SET_SHOW_SERVICES:
      return Object.assign({}, state, {
        showServices: action.data,
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

// Export Reducer
export default AppReducer;
