import { call, put, take, takeLatest, select, actionChannel } from 'redux-saga/effects';
import * as types from 'actions/actionTypes';
import { API_BASE_URL, ENDPOINTS } from '../constants/apiEndpoints';
import axios from '../utils/axios';

function* createSubscriber(action) {
  try {
    const { subscriber } = action;
    const subscriberDetails = yield axios.post(`${ENDPOINTS.SUBSCRIBER.POST.URL}`, subscriber).then(response => response.data);
    yield put({ type: types.CREATE_SUBSCRIBER_SUCCESS, data: subscriberDetails });
  } catch (error) {
    yield put({ type: types.CREATE_SUBSCRIBER_FAILED, error });
  }
}

function* updateSubscriber(action) {
  try {
    const { subscriber, msisdn } = action;
    const subscriberDetails = yield axios.patch(`${ENDPOINTS.SUBSCRIBER.PATCH.URL}${msisdn}`, subscriber).then(response => response.data);
    yield put({ type: types.UPDATE_SUBSCRIBER_SUCCESS, data: subscriberDetails });
  } catch (error) {
    yield put({ type: types.UPDATE_SUBSCRIBER_FAILED, error });
  }
}

function* fetchSubscriberDetails(action) {
  try {
    const { msisdn } = action;
    const subscriberDetails = yield axios.get(`${ENDPOINTS.SUBSCRIBER.GET.URL}${msisdn}`).then(response => response.data);
    yield call(setMsisdn, subscriberDetails.msisdn);
    yield put({ type: types.SUBSCRIBER_RECEIVED, data: subscriberDetails });
  } catch (error) {
    yield put({ type: types.SUBSCRIBER_REQUEST_FAILED, error });
  }
}

export function* subscriberWatcher() {
  const subChannel = yield actionChannel(types.GET_SUBSCRIBER);
  while (true) {
    const action = yield take(subChannel);
    yield call(fetchSubscriberDetails, action);
  }
}
export function* subscriberSaga() {
    yield all( [
        takeLatest(types.CREATE_SUBSCRIBER, createSubscriber),
        takeLatest(types.UPDATE_SUBSCRIBER, updateSubscriber),
    ])
}