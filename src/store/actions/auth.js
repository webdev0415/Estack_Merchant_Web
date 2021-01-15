import { createAction } from 'redux-act';

export const signUp = createAction('SIGNUP_ACTION', (payload) => payload);
export const signUpGoogle = createAction('SIGNUP_GOOGLE_ACTION', (payload) => payload);
export const signUpWithOTPGeneration = createAction('SIGNUP_OTP_GENERATION', (payload) => payload);
export const signUpWithOTPConfirm = createAction('SIGNUP_OTP_CONFIRM', (payload) => payload);
export const signUpWithCreateMerchant = createAction('SIGNUP_CREATE_MERCHANT', (payload) => payload);
export const login = createAction('LOGIN_ACTION', (payload) => payload);
export const loginOtp = createAction('LOGIN_OTP_ACTION', (payload) => payload);
export const loginOtpConfirm = createAction('LOGIN_OTP_CONFIRM_ACTION', (payload) => payload);
export const loginGoogle = createAction('LOGIN_GOOGLE_ACTION', (payload) => payload);
export const getSelf = createAction('SELF_ACTION');
export const updateUser = createAction('UPDATE_USER_ACTION', (payload) => payload);
export const resetPassword = createAction('RESET_PASSWORD_ACTION', (payload) => payload);
