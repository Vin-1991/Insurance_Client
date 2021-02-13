import { combineReducers } from 'redux';
import subscriber from './subscriberReducer';
import customer from './customerReducer';

export default combineReducers({
  subscriber,
  customer,
});
subscriberReducers.js
import * as types from 'actions/actionTypes';

export default function subscriberReducer(state = { isLoading: false }, action = null) {
  switch (action.type) {
   case types.GET_SUBSCRIBER:
  return { ...state, isLoading: true };
case types.SUBSCRIBER_RECEIVED:
  return { ...state, isLoading: false, subscriberDetails: action.data };
case types.SUBSCRIBER_REQUEST_FAILED:
  return { ...state, isLoading: false, error: action.error };
case types.CREATE_SUBSCRIBER:
  return { ...state, isLoading: true };
case types.CREATE_SUBSCRIBER_SUCCESS:
  return { ...state, isLoading: false, subscriberDetails: action.data };
case types.CREATE_SUBSCRIBER_FAILED:
  return { ...state, isLoading: false, error: action.error };
case types.UPDATE_SUBSCRIBER:
  return { ...state, isLoading: true };
case types.UPDATE_SUBSCRIBER_SUCCESS:
  return { ...state, isLoading: false, subscriberDetails: action.data };
case types.UPDATE_SUBSCRIBER_FAILED:
  return { ...state, isLoading: false, error: action.error };
default:
  return state;
  }
}