import { all, put, takeEvery } from 'redux-saga/effects';
import apis from '@src/apis';
import api from '@src/apis/api';
import actions from '../actions';

function* verifyTokenSaga({ accessToken }) {
  try {
    const { status } = yield apis.account.verifyToken(accessToken);
    if (!status) throw new Error();

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const { status: getMeStatus, result: user } = yield apis.account.getMe();
    if (!getMeStatus) throw new Error();

    const { remainingCharacters, lockCharacters, bonusCharacters } = user;

    yield all([
      yield put(actions.user.getLatestOrder(user.id)),
      yield put(actions.user.getUsingPackage(user.packageCode)),
      yield put(
        actions.user.updateUserCharacters({
          remainingCharacters,
          lockCharacters,
          bonusCharacters,
        }),
      ),
    ]);

    yield put(actions.auth.verifyTokenSuccess(accessToken, user));
  } catch (error) {
    yield put(actions.auth.verifyTokenFailure());
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.auth.actionTypes.VERIFY_TOKEN, verifyTokenSaga),
  ]);
}
