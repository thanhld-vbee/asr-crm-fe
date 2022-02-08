import { actionTypes } from './actions';

export const initialState = {};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SYNTHESIS_RESPONSE: {
      const { requestId, audioLink, status, progress } = action;
      return { ...state, [requestId]: { audioLink, status, progress } };
    }
    default:
      return state;
  }
};
export default requestReducer;
