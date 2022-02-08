import { actionTypes } from './actions';

export const initialState = {
  featureFlags: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FEATURE_FLAGS_SUCCESS: {
      const { featureFlags } = action;
      return { ...state, featureFlags };
    }

    default:
      return state;
  }
};

export default userReducer;
