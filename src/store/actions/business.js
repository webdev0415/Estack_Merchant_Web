import { createAction } from 'redux-act';

export const updateTier = createAction('UPDATE_TIER', (payload) => payload);
export const updateLoyaltyProgram = createAction('UPDATE_LOYALTY_PROGRAM', (payload) => payload);
export const updatePointCurrency = createAction('UPDATE_POINT_CURRENCY', (payload) => payload);
export const updateSelf = createAction('UPDATE_SELF', (payload) => payload);
export const updateBusinessAvatar = createAction('UPDATE_BUSINESS_AVATAR', (payload) => payload);
