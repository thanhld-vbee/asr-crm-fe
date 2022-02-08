import { all, put, takeLatest } from 'redux-saga/effects';
import { HAVE_NO_ORDER } from '@src/constants/order';
import apis from '@src/apis';
import actions from '../actions';

function* getUsingPackageSaga({ packageCode }) {
  if (!packageCode) return;
  try {
    const { status, result } = yield apis.packages.getPackages({
      code: packageCode,
      limit: 1,
    });
    if (!status) throw new Error();
    const [usingPackage] = result.packages;
    yield put(actions.user.getUsingPackageSuccess(usingPackage));
  } catch (error) {
    yield put(actions.user.getUsingPackageFailure());
  }
}

function* getLatestOrderSaga({ userId }) {
  try {
    const { status, result } = yield apis.orders.getOrders({
      userId,
      sort: 'createdAt_desc',
      limit: 1,
    });
    if (!status) throw new Error();
    const latestOrder = result.orders[0] || { status: HAVE_NO_ORDER };
    yield put(actions.user.getLatestOrderSuccess(latestOrder));
  } catch (error) {
    yield put(actions.user.getLatestOrderFailure());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.user.actionTypes.GET_USING_PACKAGE, getUsingPackageSaga),
    takeLatest(actions.user.actionTypes.GET_LATEST_ORDER, getLatestOrderSaga),
  ]);
}
