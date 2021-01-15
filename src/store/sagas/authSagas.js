import * as _ from 'lodash';
import axios from 'axios';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import Toast from '../../utils/Toast';
import * as actions from '../actions';
import { apiUrl } from '../../api/baseUrl';
import { setAuthFetchingStatus, setMerchantAction, setSelf, setAuthExistStatus } from '../reducers/authReducer';
import { getAuthorization, setAccessToken, setRefreshToken } from '../../utils/tokenService';
import { setBusinessAction } from '../reducers/businessReducer';

function* signUp({ payload }) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.post, `${apiUrl}/merchant/signup`, payload);

    yield put(setMerchantAction(data));
    yield put(setBusinessAction(data));

    setAccessToken(_.get(data, 'accessToken'));
    setRefreshToken(_.get(data, 'refreshToken'));
    localStorage.removeItem('userRegData');
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}
function* signUpWithOTPGeneration({payload}) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));
    const { data } = yield call(axios.post, `${apiUrl}/merchant/signup/otpgenerate`, payload);
    yield put(setAuthExistStatus({ isExist: data.existed }));
  } catch(e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
  
}
function* signUpWithOTPConfirm({payload}) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));
    const { data } = yield call(axios.post, `${apiUrl}/merchant/signup/otpconfirm`, payload);
    yield put(setMerchantAction(data));
    setAccessToken(_.get(data, 'accessToken'));
    setRefreshToken(_.get(data, 'refreshToken'));
  } catch(e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}
function* signUpWithCreateMerchant({payload}) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));
    const { data } = yield call(axios.post, `${apiUrl}/merchant/signup/otpmerchant`, payload);
    yield put(setMerchantAction(data));
    setAccessToken(_.get(data, 'accessToken'));
    setRefreshToken(_.get(data, 'refreshToken'));
  } catch(e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}
function* signUpGoogle({ payload: { token, payload } }) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.post, `${apiUrl}/merchant/singnup/google/${token}`, payload);

    yield put(setMerchantAction(data));
    yield put(setBusinessAction(data));

    setAccessToken(_.get(data, 'accessToken'));
    setRefreshToken(_.get(data, 'refreshToken'));
    localStorage.removeItem('userRegData');
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}

function* login({ payload }) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));
    const { data } = yield call(axios.post, `${apiUrl}/auth/login/merchant`, payload);

    yield put(setMerchantAction(data));

    setAccessToken(_.get(data, 'accessToken'));
    setRefreshToken(_.get(data, 'refreshToken'));
  } catch (e) {
    if (_.isString(_.get(e, 'response.data.message'))) {
      Toast.errorToast(_.get(e, 'response.data.message'));
    } else {
      Toast.errorToast('Input data is not correct!');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}
function* loginOtp({ payload }) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));
    const { data } = yield call(axios.post, `${apiUrl}/merchant/login/otpgenerate`, payload);
    if (data.existed) {
      yield put(setAuthExistStatus({ isExist: data.existed }));
    } else {
      Toast.errorToast('User is not exist');
    }
    
  } catch(e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}
function* loginOtpConfirm({ payload }) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));
    const { data } = yield call(axios.post, `${apiUrl}/merchant/signup/otpconfirm`, payload);
    yield put(setMerchantAction(data));
    setAccessToken(_.get(data, 'accessToken'));
    setRefreshToken(_.get(data, 'refreshToken'));
  } catch(e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}
function* loginGoogle({ payload }) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));
    const { data } = yield call(axios.post, `${apiUrl}/auth/google/login/merchant`, payload);

    yield put(setMerchantAction(data));

    setAccessToken(_.get(data, 'accessToken'));
    setRefreshToken(_.get(data, 'refreshToken'));
  } catch (e) {
    if (_.isString(_.get(e, 'response.data.message'))) {
      Toast.errorToast(_.get(e, 'response.data.message'));
    } else {
      Toast.errorToast('Input data is not correct!');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}


function* getSelf() {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.get,
      `${apiUrl}/merchant/service/self`,
      { headers: getAuthorization() });

    yield put(setMerchantAction(data));
    yield put(setBusinessAction(data));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}

function* updateSelf({ payload }) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));

    const { data } = yield call(axios.put,
      `${apiUrl}/merchant/service/self`,
      payload,
      { headers: getAuthorization() });

    yield put(setSelf(data));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}

function* resetPassword({ payload }) {
  try {
    yield put(setAuthFetchingStatus({ isFetching: true }));

    yield call(axios.post, `${apiUrl}/auth/forgot-password`, payload);
    Toast.successToast('New password was sent to your email');
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Input data is not correct');
    }
  } finally {
    yield put(setAuthFetchingStatus({ isFetching: false }));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(actions.signUp, signUp),
    takeLatest(actions.signUpGoogle, signUpGoogle),
    takeLatest(actions.signUpWithOTPGeneration, signUpWithOTPGeneration),
    takeLatest(actions.signUpWithCreateMerchant, signUpWithCreateMerchant),
    takeLatest(actions.signUpWithOTPConfirm, signUpWithOTPConfirm),
    takeLatest(actions.login, login),
    takeLatest(actions.loginOtp, loginOtp),
    takeLatest(actions.loginOtpConfirm, loginOtpConfirm),
    takeLatest(actions.loginGoogle, loginGoogle),
    takeLatest(actions.getSelf, getSelf),
    takeLatest(actions.updateUser, updateSelf),
    takeLatest(actions.resetPassword, resetPassword),
  ]);
}
