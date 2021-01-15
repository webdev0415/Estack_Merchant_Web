import { createAction } from 'redux-act';

export const getCustomersList = createAction('GET_CUSTOMERS_LIST');
export const getTransactionsList = createAction('GET_TRANSACTIONS_LIST');

export const getDashboardCardInfo = createAction('GET_DASHBOARD_CARD_INFO');

export const getDashboardInfoPointEarnedTable = createAction('GET_DASHBOARD_INFO_POINT_TABLE');

export const removeDashboardChartInfo = createAction('REMOVE_DASHBOARD_CHART_INFO');
