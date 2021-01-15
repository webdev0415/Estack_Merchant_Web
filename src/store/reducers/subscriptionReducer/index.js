import { createAction, createReducer } from 'redux-act';
import * as _ from 'lodash';

const initialState = {};

const reducer = createReducer({}, initialState);

export const setSubscriptionAction = createAction('SET_SUBSCRIPTION_ACTION', (payload) => payload);
export const setCreatedSubscriptionAction = createAction('SET_CREATED_SUBSCRIPTION_ACTION', (payload) => payload);
export const setDeletedSubscriptionAction = createAction('SET_DELETED_SUBSCRIPTION_ACTION', (payload) => payload);
export const setUpdatedSubscriptionAction = createAction('SET_UPDATED_SUBSCRIPTION_ACTION', (payload) => payload);

reducer.on(setSubscriptionAction, (state, { emailData, ...rest }) => {
  const data = emailData.reduce((acc, cur) => {
    // eslint-disable-next-line no-underscore-dangle
    acc[cur._id] = cur.data;

    return acc;
  }, {});

  const emailList = emailData.reduce((acc, cur) => {
    const list = cur.data.map((item) => (
      { value: item.email, subscriptionid: item.subscriptionId }
    ));

    acc.push(...list);

    return acc;
  }, []);

  return {
    ...state, ...rest, emailData: data, emailList,
  };
});
reducer.on(setCreatedSubscriptionAction, (state, action) => {
  const clone = _.cloneDeep(state);

  clone.results.push(action);
  clone.totalCount = state.totalCount + 1;

  return clone;
});
reducer.on(setDeletedSubscriptionAction, (state, action) => {
  const clone = _.cloneDeep(state);

  // eslint-disable-next-line no-underscore-dangle
  clone.results = state.results.filter((i) => action !== i._id);
  clone.totalCount = state.totalCount - 1;

  return clone;
});
reducer.on(setUpdatedSubscriptionAction, (state, { id, ...rest }) => {
  const clone = _.cloneDeep(state);

  // eslint-disable-next-line no-underscore-dangle
  const index = state.results.findIndex((i) => id === i._id);

  if (index > -1) {
    clone.results[index] = { ...clone.results[index], ...rest };
  }

  return clone;
});

export default reducer;
