import { ADD_SUBM, ADD_SUBMS, DELETE_SUBM, ACCEPT_SUBM, UPDATE_SUBM } from './SubmActions';

// Initial State
const initialState = { data: [] };

const SubmReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUBM :
      return Object.assign({}, state, {
        data: [action.subm, ...state.data],
      });

    case ADD_SUBMS :
      return Object.assign({}, state, {
        data: action.subms,
      });

    case DELETE_SUBM :
      return Object.assign({}, state, {
        data: state.data.filter(subm => subm.cuid !== action.cuid),
      });

    case ACCEPT_SUBM:
      return Object.assign({}, state, {
        //submitted: [action.data, ...state.submitted],
      });

    case UPDATE_SUBM:
      return Object.assign({}, state, {
        data: state.data.map(subm => subm.cuid === action.subm.cuid ? action.subm : subm ),
      });

    default:
      return state;
  }
};

/* Selectors */

// Get all submissiones
export const getSubms = state => state.subms.data;

// Get subm by cuid
export const getSubm = (state, cuid) => state.subms.data.filter(subm => subm.cuid === cuid)[0];

// Export Reducer
export default SubmReducer;
