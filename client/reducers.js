/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import forms from './modules/Form/FormReducer';
import subms from './modules/Subm/SubmReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  forms,
  subms,
  intl,
});
