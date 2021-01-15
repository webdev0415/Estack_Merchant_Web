import _ from 'lodash';
import { createAction, createReducer } from 'redux-act';
import moment from 'moment';
import { getDOB } from '../../../utils';

const initialState = {
  customersList: [],
  transactionsList: [],
  isFetching: true,
  dashBoardCards: {
    totalTransactions: {
      totalAmount: null,
      transactionsToday: null,
    },
    visits: {
      totalVisits: null,
      todayVisits: null,
    },
    members: {
      totalMembers: null,
    },
    grossValue: {
      totalAmount: null,
    },
  },
  dashBoardChart: {
    data: [],
    pointStart: null,
    pointInterval: null,
  },
};

const reducer = createReducer({}, initialState);

export const setCustomersList = createAction('SET_CUSTOMER_LIST', (payload) => payload);
reducer.on(setCustomersList, (state, payload) => {
  const customersList = _.map(payload.list, ({
    customerTier, customer, user, loyaltyTier, pointsEarned, pointsRedeemed, pointBalance,
  }) => ({
    key: _.get(customer, 'id'),
    id: _.padStart(_.get(customer, 'id'), 6, '0'),
    firstName: _.get(user, 'auth.email'),
    age: getDOB(_.get(customer, 'DOB')),
    gender: _.get(customer, 'gender') || '-',
    joinedAt: moment(_.get(customerTier, 'created_at')).format('DD MMM YYYY'),
    tier: _.get(loyaltyTier, 'tierName'),
    pointsEarned: _.round(pointsEarned, 2),
    pointsRedeemed: _.round(pointsRedeemed, 2),
    pointBalance: _.round(pointBalance, 2),
  }));

  return {
    ...state,
    customersList,
  };
});

export const setTransactionList = createAction('SET_TRANSACTIONS_LIST', (payload) => payload);
reducer.on(setTransactionList, (state, payload) => {
  const transactionsList = _.map(payload.list, ({
    walletTransaction, walletTransactionsLog, customer, pos, coupon,
  }) => {
    if (_.get(walletTransactionsLog, 'type') === 'POINTS_EARNED') {
      return ({
        key: _.get(customer, 'id'),
        transactionId: `T${_.padStart(_.get(walletTransactionsLog, 'id'), 6, '0')}`,
        customerId: _.padStart(_.get(customer, 'id'), 6, '0'),
        points: `${_.get(walletTransactionsLog, 'cost')}`,
        couponId: _.get(coupon, 'uuid') ? `C${_.padStart(_.get(coupon, 'uuid'), 6, '0')}` : '-',
        currency: '-',
        posId: _.get(pos, 'id') ? `POS${_.padStart(_.get(pos, 'id'), 3, '0')}` : '-',
        createdAt: _.get(walletTransaction, 'created_at'),
      });
    }
    if (_.get(walletTransactionsLog, 'type') === 'COUPON_CREATED') {
      return ({
        key: _.get(customer, 'id'),
        transactionId: `T${_.padStart(_.get(walletTransactionsLog, 'id'), 6, '0')}`,
        customerId: _.padStart(_.get(customer, 'id'), 6, '0'),
        points: `-${_.get(walletTransactionsLog, 'cost')}`,
        couponId: _.get(coupon, 'uuid') ? `C${_.padStart(_.get(coupon, 'uuid'), 6, '0')}` : '-',
        currency: `${_.get(walletTransactionsLog, 'cost')}${_.get(walletTransactionsLog, 'currency')}`,
        posId: _.get(pos, 'id') ? `POS${_.padStart(_.get(pos, 'id'), 3, '0')}` : '-',
        createdAt: _.get(walletTransaction, 'created_at'),
      });
    }
  });

  return {
    ...state,
    transactionsList,
  };
});

export const setStatsFetchingStatus = createAction('SET_CUSTOMER_LIST_FETCHING_STATUS',
  (payload) => payload);
reducer.on(setStatsFetchingStatus, (state, {
  isFetching,
}) => ({
  ...state,
  isFetching,
}));

export const setDashboardCardInfo = createAction('SET_DASHBOARD_CARD_INFO',
  (payload) => payload);
reducer.on(setDashboardCardInfo, (state, payload) => ({
  ...state,
  dashBoardCards: payload,
}));

export const setDashboardChartInfo = createAction('SET_DASHBOARD_CHART_INFO',
  (payload) => payload);
reducer.on(setDashboardChartInfo, (state, payload) => ({
  ...state,
  dashBoardChart: payload,
}));

export const removeDashboardChartInfo = createAction('REMOVE_FROM_STORE_CHART_INFO',
  (payload) => payload);
reducer.on(removeDashboardChartInfo, (state) => ({
  ...state,
  dashBoardChart: {
    data: [],
    pointStart: null,
    pointInterval: null,
  },
}));

export default reducer;
