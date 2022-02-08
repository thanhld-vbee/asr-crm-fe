import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import userSagas from './user/sagas';
import featureFlagSagas from './featureFlag/sagas';

function* rootSaga() {
  yield all([authSagas(), userSagas(), featureFlagSagas()]);
}

export default rootSaga;
