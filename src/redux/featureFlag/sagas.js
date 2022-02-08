import { all, put, takeLatest } from 'redux-saga/effects';
import apis from '@src/apis';
import actions from '../actions';

function* getFeatureFlagsSaga() {
  try {
    const featureFlags = yield apis.featureFlags.getFeatureFlags();
    yield put(actions.featureFlag.getFeatureFlagsSuccess(featureFlags));
  } catch (error) {
    throw new Error();
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(
      actions.featureFlag.actionTypes.GET_FEATURE_FLAGS,
      getFeatureFlagsSaga,
    ),
  ]);
}
