import * as types from './actionTypes';

export function getSubscriber(msisdn) {
  return { type: types.GET_SUBSCRIBER, msisdn };
}

export function createSubscriber(subscriber) {
  return { type: types.CREATE_SUBSCRIBER, subscriber };
}

export function updateSubscriber(subscriber, msisdn) {
  return { type: types.UPDATE_SUBSCRIBER, subscriber, msisdn };
}