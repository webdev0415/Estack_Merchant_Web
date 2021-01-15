import { createAction } from 'redux-act';

export const invitePoses = createAction('INVITE_POSES_ACTION', (payload) => payload);
export const invitePos = createAction('INVITE_POS_ACTION', (payload) => payload);
export const getPoses = createAction('GET_POSES_ACTION', (payload) => payload);
export const changePosStatus = createAction('CHANGE_POS_STATUS_ACTION', (payload) => payload);
export const resetPosPassword = createAction('RESET_POS_PASSWORD_ACTION', (payload) => payload);
export const resendInvite = createAction('RESEND_POS_INVITE_ACTION', (payload) => payload);
