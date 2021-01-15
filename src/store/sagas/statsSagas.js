import axios from 'axios';
import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import moment from 'moment';
import * as _ from 'lodash';
import * as actions from '../actions';
import { apiUrl } from '../../api/baseUrl';
import { getAuthorization } from '../../utils/tokenService';
import {
  setCustomersList, setStatsFetchingStatus, setTransactionList, setDashboardCardInfo, setDashboardChartInfo, removeDashboardChartInfo,
} from '../reducers/statsReducer';


function* getCustomersList() {
  try {
    yield put(setStatsFetchingStatus({ isFetching: true }));

    const { data } = yield call(
      axios.get,
      `${apiUrl}/merchant/service/customers`,
      { headers: getAuthorization() },
    );

    yield put(setCustomersList({ list: data }));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setStatsFetchingStatus({ isFetching: false }));
  }
}

function* getTransactionsList() {
  try {
    yield put(setStatsFetchingStatus({ isFetching: true }));

    const { data } = yield call(
      axios.get,
      `${apiUrl}/merchant/service/transactions`,
      { headers: getAuthorization() },
    );

    yield put(setTransactionList({ list: data }));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setStatsFetchingStatus({ isFetching: false }));
  }
}

function* getDashboardCardInfo() {
  try {
    yield put(setStatsFetchingStatus({ isFetching: true }));

    const { data } = yield call(
      axios.get,
      `${apiUrl}/walletTransactionsLogs/service/getDashboardInfo/merchant`,
      {
        headers: getAuthorization(),
      },
    );

    yield put(setDashboardCardInfo(data));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setStatsFetchingStatus({ isFetching: false }));
  }
}

function* getDashboardInfoPointEarnedTable({ payload }) {
  try {
    yield put(setStatsFetchingStatus({ isFetching: true }));
    const startDate = moment(payload.pickDate).startOf(payload.periud).toISOString();
    const endDate = moment(payload.pickDate).endOf(payload.periud).toISOString();

    const { data } = yield call(
      axios.get,
      `${apiUrl}/walletTransactionsLogs/service/getDashboardInfoPointEarnedTable/merchant`,
      {
        headers: getAuthorization(),
        params: {
          startDate,
          endDate,
          type: payload.type,
        },
      },
    );
    const dataArray = [];
    let length;
    const chartData = {};
    let momentFormat;
    let tickInterval = 1;

    switch (payload.periud) {
      case 'day':
        length = 24;
        momentFormat = 'HH';

        for (let i = 0; i < 24; i++) {
          chartData[i] = 0;
        }
        break;
      case 'week':
        length = 7;
        momentFormat = 'd';
        for (let i = 1; i <= 7; i++) {
          chartData[i] = 0;
        }
        break;
      case 'month':
        length = moment(payload.pickDate).daysInMonth();
        momentFormat = 'DD';
        for (let i = 1; i <= moment(payload.pickDate).daysInMonth(); i++) {
          chartData[i] = 0;
        }
        break;
      case 'year':
        length = 12;
        momentFormat = 'MM';
        for (let i = 1; i <= 12; i++) {
          chartData[i] = 0;
        }
        break;
      default:
        length = 0;
        break;
    }

    for (let i = 0; i < data.pointsTotal.length; i++) {
      const date = new Date(data.pointsTotal[i].created_at).getTime();
      chartData[_.toNumber(moment(date).format(momentFormat))] += data.pointsTotal[i].currencyAmount;
    }

    for (const key in chartData) {
      if (tickInterval < chartData[key]) {
        tickInterval = Math.ceil(chartData[key]);
      }
    }

    let result = 1;
    while (result !== 0) {
      tickInterval += 1;
      result = tickInterval % 4;
    }
    tickInterval /= 4;

    for (let i = 1; i <= length; i++) {
      let date;
      switch (payload.periud) {
        case 'day':
          date = `${i.toString() - 1} h`;
          break;
        case 'week':
          switch (i) {
            case 1:
              date = 'Mon';
              // points
              break;
            case 2:
              date = 'Tue';
              break;
            case 3:
              date = 'Wed';
              break;
            case 4:
              date = 'Thu';
              break;
            case 5:
              date = 'Fri';
              break;
            case 6:
              date = 'Sat';
              break;
            case 7:
              date = 'Sun';
              break;
            default:
              break;
          }
          break;
        case 'month':
          date = `${i.toString()} d`;
          break;
        case 'year':
          date = `${moment.monthsShort(i - 1)}`;
          break;
        default:
          date = 0;
          break;
      }
      dataArray.push(
        {
          date,
          points: chartData[i],
        },
      );
    }

    yield put(setDashboardChartInfo({
      data: dataArray,
      cols: {
        points: {
          tickInterval,
        },
      },
    }));
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setStatsFetchingStatus({ isFetching: false }));
  }
}

function* removeChartInfo() {
  try {
    yield put(setStatsFetchingStatus({ isFetching: true }));
    yield put(removeDashboardChartInfo());
  } catch (e) {
    console.error(e);
  } finally {
    yield put(setStatsFetchingStatus({ isFetching: false }));
  }
}

export default function* sagas() {
  yield all([
    takeLatest(actions.getCustomersList, getCustomersList),
    takeLatest(actions.getTransactionsList, getTransactionsList),
    takeLatest(actions.getDashboardCardInfo, getDashboardCardInfo),
    takeLatest(actions.getDashboardInfoPointEarnedTable, getDashboardInfoPointEarnedTable),
    takeLatest(actions.removeDashboardChartInfo, removeChartInfo),
  ]);
}
