export const actionTypes = {
  GET_FEATURE_FLAGS: 'GET_FEATURE_FLAGS',
  GET_FEATURE_FLAGS_SUCCESS: 'GET_FEATURE_FLAGS_SUCCESS',
};

const getFeatureFlags = () => ({
  type: actionTypes.GET_FEATURE_FLAGS,
});

const getFeatureFlagsSuccess = (featureFlags) => ({
  type: actionTypes.GET_FEATURE_FLAGS_SUCCESS,
  featureFlags,
});

export { getFeatureFlags, getFeatureFlagsSuccess };
