import { createAction } from 'redux-act';

export const getSubscriptionPlan = createAction('GET_SUBSCRIPTION_PLAN_SAGA', (payload) => payload);
export const updateSubscriptionPlan = createAction('UPDATE_SUBSCRIPTION_PLAN_SAGA', (payload) => payload);
export const deleteSubscriptionPlan = createAction('DELETE_SUBSCRIPTION_PLAN_SAGA', (payload) => payload);
export const createSubscriptionPlan = createAction('CREATE_SUBSCRIPTION_PLAN_SAGA', (payload) => payload);
export const updateSubscription = createAction('UPDATE_SUBSCRIPTION_SAGA', (payload) => payload);
