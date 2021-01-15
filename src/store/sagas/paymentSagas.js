import axios from 'axios';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import * as actions from '../actions';
import { apiUrl } from '../../api/baseUrl';
import { getAuthorization } from '../../utils/tokenService';
import {
  deleteCard, setCard, setCardList, setPaymentFetchingStatus,
} from '../reducers/payment';
import Toast from '../../utils/Toast';

function* addCard({ payload }) {
  try {
    yield put(setPaymentFetchingStatus({ isFetching: true }));

    const { data } = yield call(
      axios.post,
      `${apiUrl}/merchant/service/new-payment`,
      payload,
      { headers: getAuthorization() },
    );

    yield put(setCard(data));
  } catch (e) {
    Toast.errorToast('Something wrong. Add another card or try later');
  } finally {
    yield put(setPaymentFetchingStatus({ isFetching: false }));
  }
}

function* getCardList() {
  try {
    yield put(setPaymentFetchingStatus({ isFetching: true }));

    const { data } = yield call(
      axios.get,
      `${apiUrl}/merchant/service/payment-list`,
      { headers: getAuthorization() },
    );
    yield put(setCardList(data));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setPaymentFetchingStatus({ isFetching: false }));
  }
}

function* submitPayment(payload) {
  try {
    yield put(setPaymentFetchingStatus({ isFetching: true }));

    yield call(
      axios.post,
      `${apiUrl}/merchant/service/submit-payment`,
      payload,
      { headers: getAuthorization() },
    );

    Toast.successPayment('Payment successful');
  } catch (e) {
    Toast.errorToast('Payment is not successful, please, try later');
  } finally {
    yield put(setPaymentFetchingStatus({ isFetching: false }));
  }
}

function* deletePayment({ payload }) {
  try {
    yield put(setPaymentFetchingStatus({ isFetching: true }));

    const { data } = yield call(
      axios.post,
      `${apiUrl}/merchant/service/delete-payment`,
      payload,
      { headers: getAuthorization() },
    );

    yield put(deleteCard(data));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setPaymentFetchingStatus({ isFetching: false }));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(actions.addCard, addCard),
    takeLatest(actions.getCardList, getCardList),
    takeLatest(actions.submitPayment, submitPayment),
    takeLatest(actions.deletePayment, deletePayment),
  ]);
}
