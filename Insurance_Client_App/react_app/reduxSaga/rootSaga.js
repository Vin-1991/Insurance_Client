import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { subscriberWatcher, subscriberSaga } from 'sagas/subscriberSaga';
import { customerSaga } from 'sagas/customerSaga';


export default function* rootSaga() {
  yield all([
    subscriberWatcher(),
    customerSaga(),
  ]);
}