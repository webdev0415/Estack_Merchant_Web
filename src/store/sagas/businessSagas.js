import axios from 'axios';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import * as _ from 'lodash';
import * as actions from '../actions';
import { apiUrl } from '../../api/baseUrl';
import {
  setBusinessAvatar,
  setBusinessFetchingStatus,
  setLoyaltyProgram,
  setPointCurrency,
  setSelf,
  setTier,
} from '../reducers/businessReducer';
import { getAuthorization } from '../../utils/tokenService';
import Toast from '../../utils/Toast';

function* updateTier({ payload: { id, data: payload } }) {
  try {
    yield put(setBusinessFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.put,
      `${apiUrl}/merchant/service/update-tier/${id}`,
      payload,
      { headers: getAuthorization() });

    yield put(setTier({ loyaltyTier: data }));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setBusinessFetchingStatus({ isFetching: false }));
  }
}

function* updateLoyaltyProgram({ payload: { id, data: payload } }) {
  try {
    yield put(setBusinessFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.put,
      `${apiUrl}/merchant/service/update-loyalty-program/${id}`,
      payload,
      { headers: getAuthorization() });

    yield put(setLoyaltyProgram({ loyaltyProgram: data }));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Smt went wrong');
    }
  } finally {
    yield put(setBusinessFetchingStatus({ isFetching: false }));
  }
}

function* updatePointCurrency({ payload: { id, data: payload } }) {
  try {
    yield put(setBusinessFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.put,
      `${apiUrl}/merchant/service/update-point-currency/${id}`,
      payload,
      { headers: getAuthorization() });

    yield put(setPointCurrency({ pointCurrency: data }));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setBusinessFetchingStatus({ isFetching: false }));
  }
}

function* updateSelf({ payload }) {
  try {
    yield put(setBusinessFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.put,
      `${apiUrl}/merchant/service/self`,
      payload,
      { headers: getAuthorization() });

    if (payload.subscription && payload.subscription.paymentCycle && data.subscription) {
      data.subscription.paymentCycle = payload.subscription.paymentCycle;
    } else if (payload.subscription && payload.subscription.paymentCycle && !data.subscription) {
      _.set(data, 'subscription', { paymentCycle: payload.subscription.paymentCycle });
    }

    yield put(setSelf(data));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setBusinessFetchingStatus({ isFetching: false }));
  }
}

function* updateBusinessAvatar({ payload }) {
  try {
    yield put(setBusinessFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.post,
      `${apiUrl}/merchant/service/upload-brand-avatar`,
      payload.file,
      { headers: getAuthorization() });

    yield put(setBusinessAvatar(data));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setBusinessFetchingStatus({ isFetching: false }));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(actions.updateTier, updateTier),
    takeLatest(actions.updateLoyaltyProgram, updateLoyaltyProgram),
    takeLatest(actions.updatePointCurrency, updatePointCurrency),
    takeLatest(actions.updateSelf, updateSelf),
    takeLatest(actions.updateBusinessAvatar, updateBusinessAvatar),
  ]);
}
