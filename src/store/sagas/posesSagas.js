import axios from 'axios';
import _ from 'lodash';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import Toast from '../../utils/Toast';
import * as actions from '../actions';
import { apiUrl } from '../../api/baseUrl';
import { setBusinessAction, setBusinessFetchingStatus } from '../reducers/businessReducer';
import { getAuthorization } from '../../utils/tokenService';
import {
  addPos, setPoses, setPosesFetchingStatus, updatePos,
} from '../reducers/posesReducer';
import { posStatusEnum } from '../../utils';

function* getPoses({ payload: { onlyActiveStatus } }) {
  try {
    yield put(setPosesFetchingStatus({ isFetching: true }));

    const { data } = yield call(
      axios.get,
      `${apiUrl}/merchant/service/poses/${onlyActiveStatus}`,
      { headers: getAuthorization() },
    );

    yield put(setPoses({ poses: data }));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setPosesFetchingStatus({ isFetching: false }));
  }
}

function* invitePoses({ payload }) {
  try {
    yield put(setBusinessFetchingStatus({ isFetching: true }));

    const { data } = yield call(
      axios.post,
      `${apiUrl}/pos/service/invite`,
      payload,
      { headers: getAuthorization() },
    );

    yield put(setBusinessAction({ poses: data.invitedPoses }));
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

function* invitePos({ payload }) {
  try {
    yield put(setPosesFetchingStatus({ isFetching: true }));

    const { data: { invitedPoses, failedInvitation } } = yield call(
      axios.post,
      `${apiUrl}/pos/service/invite`,
      payload,
      { headers: getAuthorization() },
    );
    if (_.isEmpty(invitedPoses)) {
      _.forEach(failedInvitation, (email) => {
        Toast.errorToast(`${email} wasn't invited`);
      });
    } else {
      yield put(addPos({ pos: _.first(invitedPoses) }));
    }
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Smt went wrong');
    }
  } finally {
    yield put(setPosesFetchingStatus({ isFetching: false }));
  }
}

function* changePosStatus({ payload }) {
  try {
    yield put(setPosesFetchingStatus({ isFetching: true }));

    const getUrl = (statusToSet) => {
      switch (statusToSet) {
        case posStatusEnum.PENDING:
          return 're-invite';
        case posStatusEnum.INVITE_CANCELLED:
          return 'cancel-invitations';
        case posStatusEnum.ACTIVE:
          return 'activate-pos';
        case posStatusEnum.REVOKED:
          return 'revoke-pos';
        case posStatusEnum.DELETED:
          return 'delete-pos';
        default:
          return '';
      }
    };

    const { data } = yield call(
      axios.put,
      `${apiUrl}/pos/service/${getUrl(payload.status)}/${payload.id}`,
      {},
      { headers: getAuthorization() },
    );

    yield put(updatePos(data));
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Smt went wrong');
    }
  } finally {
    yield put(setPosesFetchingStatus({ isFetching: false }));
  }
}

function* resetPassword({ payload }) {
  try {
    yield put(setPosesFetchingStatus({ isFetching: true }));

    yield call(axios.post, `${apiUrl}/auth/forgot-password`, payload);
    Toast.successToast('New password was sent to pos email');
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Smt went wrong');
    }
  } finally {
    yield put(setPosesFetchingStatus({ isFetching: false }));
  }
}

function* resendInvite({ payload: { id } }) {
  try {
    yield put(setPosesFetchingStatus({ isFetching: true }));

    yield call(axios.post,
      `${apiUrl}/pos/service/resend-invite/${id}`,
      {},
      { headers: getAuthorization() });

    Toast.successToast('New invitation was sent to pos email');
  } catch (e) {
    if (_.isString(_.get(e.response, 'data.message'))) {
      Toast.errorToast(e.response.data.message);
    } else {
      Toast.errorToast('Smt went wrong');
    }
  } finally {
    yield put(setPosesFetchingStatus({ isFetching: false }));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(actions.invitePoses, invitePoses),
    takeLatest(actions.invitePos, invitePos),
    takeLatest(actions.getPoses, getPoses),
    takeLatest(actions.changePosStatus, changePosStatus),
    takeLatest(actions.resetPosPassword, resetPassword),
    takeLatest(actions.resendInvite, resendInvite),
  ]);
}
