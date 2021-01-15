import axios from 'axios';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import * as _ from 'lodash';
import * as actions from '../actions';
import { apiUrl } from '../../api/baseUrl';
import {
  setCreatedSubscriptionAction, setDeletedSubscriptionAction,
  setSubscriptionAction, setUpdatedSubscriptionAction,
} from '../reducers/subscriptionReducer';
import { getAuthorization } from '../../utils/tokenService';
import Toast from '../../utils/Toast';

function* getSubscriptionPlan() {
  try {
    const { data } = yield call(axios.get,
      `${apiUrl}/subscription-plan/service`,
      { headers: getAuthorization() });

    yield put(setSubscriptionAction(data));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  }
}

function* createSubscriptionPlan({ payload }) {
  try {
    const { data } = yield call(axios.post,
      `${apiUrl}/subscription-plan/service`,
      payload,
      { headers: getAuthorization() });

    yield put(setCreatedSubscriptionAction(data));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  }
}

function* updateSubscriptionPlan({ payload: { id, ...rest } }) {
  try {
    yield call(axios.patch,
      `${apiUrl}/subscription-plan/service/${id}`,
      rest,
      { headers: getAuthorization() });

    yield put(setUpdatedSubscriptionAction({ id, ...rest }));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  }
}

function* updateSubscription({ payload: { id, data: { created, deleted } } }) {
  try {
    if (created.length || deleted.length) {
      const res = yield call(axios.patch,
        `${apiUrl}/subscription-plan/service`,
        { id, created, deleted },
        { headers: getAuthorization() });

      yield put(setSubscriptionAction({ emailData: res.data }));
    }
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  }
}

function* deleteSubscriptionPlan({ payload: { id } }) {
  try {
    yield call(axios.delete,
      `${apiUrl}/subscription-plan/service/${id}`,
      { headers: getAuthorization() });

    yield put(setDeletedSubscriptionAction(id));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  }
}

export default function* sagas() {
  yield all([
    takeLatest(actions.getSubscriptionPlan, getSubscriptionPlan),
    takeLatest(actions.createSubscriptionPlan, createSubscriptionPlan),
    takeLatest(actions.updateSubscriptionPlan, updateSubscriptionPlan),
    takeLatest(actions.deleteSubscriptionPlan, deleteSubscriptionPlan),
    takeLatest(actions.updateSubscription, updateSubscription),
  ]);
}
