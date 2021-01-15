import { fork } from 'redux-saga/effects';
import authSagas from './authSagas';
import businessSagas from './businessSagas';
import posesSagas from './posesSagas';
import statsSagas from './statsSagas';
import paymentSagas from './paymentSagas';
import subscriptionSagas from './subscriptionSagas';

export default function* rootSaga() {
  yield fork(authSagas);
  yield fork(businessSagas);
  yield fork(posesSagas);
  yield fork(statsSagas);
  yield fork(paymentSagas);
  yield fork(subscriptionSagas);
}
