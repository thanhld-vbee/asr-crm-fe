import { actionTypes } from './actions';

export const initialState = {
  usingPackage: {},
  latestOrder: {},
  remainingCharacters: 0,
  bonusCharacters: 0,
  lockCharacters: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USING_PACKAGE:
      return { ...state };

    case actionTypes.GET_USING_PACKAGE_SUCCESS: {
      const { usingPackage } = action;
      return { ...state, usingPackage };
    }

    case actionTypes.GET_USING_PACKAGE_FAILURE:
      return { ...state };

    case actionTypes.GET_LATEST_ORDER:
      return { ...state };
    case actionTypes.GET_LATEST_ORDER_SUCCESS: {
      const { latestOrder } = action;
      return { ...state, latestOrder };
    }
    case actionTypes.GET_LATEST_ORDER_FAILURE:
      return { ...state };

    case actionTypes.UPDATE_USER_CHARACTERS: {
      const { remainingCharacters, bonusCharacters, lockCharacters } = action;
      const characters = {};
      if (remainingCharacters !== undefined)
        characters.remainingCharacters = remainingCharacters;
      if (bonusCharacters !== undefined)
        characters.bonusCharacters = bonusCharacters;
      if (lockCharacters !== undefined)
        characters.lockCharacters = lockCharacters;

      return { ...state, ...characters };
    }

    default:
      return state;
  }
};

export default userReducer;
