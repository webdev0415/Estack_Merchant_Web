import _ from 'lodash';
import { createAction, createReducer } from 'redux-act';

const initialState = {
  business: {},
  loyaltyProgram: {},
  loyaltyTiers: {},
  pointCurrency: {},
  subscription: {},
  places: [],
  poses: [],
  isFetching: false,
};

const reducer = createReducer({}, initialState);

export const setBusinessAction = createAction('SET_BUSINESS_ACTION', (payload) => payload);
reducer.on(setBusinessAction, (state, payload) => ({
  ...state,
  ...payload,
}));

export const setBusinessFetchingStatus = createAction('SET_BUSINESS_FETCHING_STATUS',
  (payload) => payload);
reducer.on(setBusinessFetchingStatus, (state, {
  isFetching,
}) => ({
  ...state,
  isFetching,
}));

export const setTier = createAction('SET_TIER_ACTION', (payload) => payload);
reducer.on(setTier, (state, {
  loyaltyTier,
}) => ({
  ...state,
  loyaltyTiers: _.chain(state.loyaltyTiers)
    .map((tier) => (_.isEqual(_.get(loyaltyTier, '_id'), _.get(tier, '_id')) ? loyaltyTier : tier))
    .value(),
}));

export const setLoyaltyProgram = createAction('SET_LOYALTY_PROGRAM_ACTION', (payload) => payload);
reducer.on(setLoyaltyProgram, (state, {
  loyaltyProgram,
}) => ({
  ...state,
  loyaltyProgram,
}));

export const setPointCurrency = createAction('SET_POINT_CURRENCY_ACTION', (payload) => payload);
reducer.on(setPointCurrency, (state, {
  pointCurrency,
}) => ({
  ...state,
  pointCurrency,
}));

export const setSelf = createAction('SET_SELF_ACTION', (payload) => payload);
reducer.on(setSelf, (state, {
  business, subscription,
}) => ({
  ...state,
  business: { ...state.business, ...business },
  subscription: { ...state.subscription, ...subscription },
}));

export const setBusinessAvatar = createAction('SET_BUSINESS_AVATAR', (payload) => payload);
reducer.on(setBusinessAvatar, (state, business) => ({
  ...state,
  business,
}));

export default reducer;
