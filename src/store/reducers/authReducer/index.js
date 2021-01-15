import { createAction, createReducer } from 'redux-act';

const initialState = {
  user: {},
  merchant: {},
  isFetching: true,
  isExist: false,
};

const reducer = createReducer({}, initialState);

export const setMerchantAction = createAction('SET_MERCHANT_ACTION', (payload) => payload);
reducer.on(setMerchantAction, (state, {
  user = {}, merchant = {}, accessToken, refreshToken,
}) => ({
  ...state,
  user,
  merchant,
  accessToken,
  refreshToken,
}));

export const setSelf = createAction('UPDATE_USER', (payload) => payload);
reducer.on(setSelf, (state, {
  user,
}) => ({
  ...state,
  user
}));

export const setAuthFetchingStatus = createAction('SET_AUTH_FETCHING_STATUS', (payload) => payload);
reducer.on(setAuthFetchingStatus, (state, {
  isFetching,
}) => ({
  ...state,
  isFetching,
}));
export const setAuthExistStatus = createAction('SET_AUTH_EXIST_STATUS', (payload) => payload)
reducer.on(setAuthExistStatus, (state, {
  isExist,
}) => ({
  ...state,
  isExist
}))
// export const signUpWithOTPGeneration = createAction('SIGNUP_OTP_GENERATION', (payload) => payload);
// reducer.on(signUpWithOTPGeneration, (state, {
//   isFetching,
// }) => ({
//   ...state,
//   isFetching,
// }))
export default reducer;
