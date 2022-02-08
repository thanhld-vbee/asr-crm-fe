export const actionTypes = {
  VERIFY_TOKEN: 'VERIFY_TOKEN',
  VERIFY_TOKEN_SUCCESS: 'VERIFY_TOKEN_SUCCESS',
  VERIFY_TOKEN_FAILURE: 'VERIFY_TOKEN_FAILURE',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
};

const verifyToken = (accessToken) => ({
  type: actionTypes.VERIFY_TOKEN,
  accessToken,
});

const verifyTokenSuccess = (accessToken, user) => ({
  type: actionTypes.VERIFY_TOKEN_SUCCESS,
  accessToken,
  user,
});

const updateUserInfo = (user) => ({
  type: actionTypes.UPDATE_USER_INFO,
  user,
});

const verifyTokenFailure = () => ({ type: actionTypes.VERIFY_TOKEN_FAILURE });

export { verifyToken, verifyTokenSuccess, verifyTokenFailure, updateUserInfo };
