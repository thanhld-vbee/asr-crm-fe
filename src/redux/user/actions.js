export const actionTypes = {
  GET_USING_PACKAGE: 'GET_USING_PACKAGE',
  GET_USING_PACKAGE_SUCCESS: 'GET_USING_PACKAGE_SUCCESS',
  GET_USING_PACKAGE_FAILURE: 'GET_USING_PACKAGE_FAILURE',
  GET_LATEST_ORDER: 'GET_LATEST_ORDER',
  GET_LATEST_ORDER_SUCCESS: 'GET_LATEST_ORDER_SUCCESS',
  GET_LATEST_ORDER_FAILURE: 'GET_LATEST_ORDER_FAILURE',
  UPDATE_USER_CHARACTERS: 'UPDATE_USER_CHARACTERS',
};

const getUsingPackage = (packageCode) => ({
  type: actionTypes.GET_USING_PACKAGE,
  packageCode,
});

const getUsingPackageSuccess = (usingPackage) => ({
  type: actionTypes.GET_USING_PACKAGE_SUCCESS,
  usingPackage,
});

const getUsingPackageFailure = () => ({
  type: actionTypes.GET_USING_PACKAGE_FAILURE,
});

const getLatestOrder = (userId) => ({
  type: actionTypes.GET_LATEST_ORDER,
  userId,
});
const getLatestOrderSuccess = (latestOrder) => ({
  type: actionTypes.GET_LATEST_ORDER_SUCCESS,
  latestOrder,
});

const updateUserCharacters = ({
  remainingCharacters,
  bonusCharacters,
  lockCharacters,
}) => ({
  type: actionTypes.UPDATE_USER_CHARACTERS,
  remainingCharacters,
  bonusCharacters,
  lockCharacters,
});

export {
  getUsingPackage,
  getUsingPackageSuccess,
  getUsingPackageFailure,
  getLatestOrder,
  getLatestOrderSuccess,
  updateUserCharacters,
};
