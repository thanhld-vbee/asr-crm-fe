import { actionTypes } from './actions';

export const initialState = {
  accessToken: null,
  verifying: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VERIFY_TOKEN:
      return { ...state, verifying: true };

    case actionTypes.VERIFY_TOKEN_SUCCESS: {
      const { accessToken, user } = action;
      return {
        ...state,
        verifying: false,
        accessToken,
        user,
      };
    }

    case actionTypes.VERIFY_TOKEN_FAILURE:
      return { ...state, verifying: false };

    case actionTypes.UPDATE_USER_INFO: {
      const { user } = action;
      return { ...state, user };
    }

    default:
      return state;
  }
};

export default authReducer;
