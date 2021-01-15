import React from 'react';
import {
  Tabs, DatePicker, Radio, Spin,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';

import DashBoardCard from './DashboardCard';
import classes from './index.module.css';

import * as actions from '../../../store/actions';

const { TabPane } = Tabs;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dayGrad: 'week',
      tabType: 'POINTS_EARNED',
    };
  }

  componentDidMount() {
    this.props.getDashboardCardInfo();
    this.changeDayGrad('week')();
  }

  pickDate = (momentDate, dayGrad, tabType) => {
    this.props.getDashboardInfoPointEarnedTable({
      pickDate: momentDate ? momentDate.toISOString() : momentDate,
      periud: dayGrad || this.state.dayGrad,
      type: tabType || this.state.tabType,
    });
  };

  changeDayGrad = (dayGrad, key) => () => {
    this.pickDate(moment(), dayGrad, key);
    this.setState({ dayGrad });
  };

  changeTab(key) {
    this.setState({ tabType: key, dayGrad: 'week' });
    this.changeDayGrad('week', key)();
  }

  renderRadioGroup() {
    return (
      <div className="d-flex">
        <Radio.Group>
          <Radio.Button
            onClick={this.changeDayGrad('day')}
            value="day"
          >
            Day
          </Radio.Button>
          <Radio.Button
            defaultChecked
            onClick={this.changeDayGrad('week')}
            value="week"
          >
            Weekly
          </Radio.Button>
          <Radio.Button
            onClick={this.changeDayGrad('month')}
            value="month"
          >
            Monthly
          </Radio.Button>
          <Radio.Button
            onClick={this.changeDayGrad('year')}
            value="year"
          >
            Yearly
          </Radio.Button>
        </Radio.Group>
        {this.renderPicker()}
      </div>
    );
  }

  renderPicker() {
    /* Костыль потому-что ант не анманутит моадлку выбора даты */
    return (
      <div className="mr-4 ml-4">
        {this.state.dayGrad === 'day'
        && <DatePicker defaultValue={moment()} onSelect={this.pickDate} picker="date" />}
        {this.state.dayGrad === 'week'
        && <DatePicker defaultValue={moment()} onSelect={this.pickDate} picker="week" />}
        {this.state.dayGrad === 'month'
        && <DatePicker defaultValue={moment()} onSelect={this.pickDate} picker="month" />}
        {this.state.dayGrad === 'year'
        && <DatePicker defaultValue={moment()} onSelect={this.pickDate} picker="year" />}
      </div>
    );
  }

  renderChart() {
    const data = this.props.isFetching ? [] : this.props.chartData.data;
    const cols = !this.props.isFetching && this.props.chartData.cols
      ? this.props.chartData.cols
      : { points: { tickInterval: 100 } };

    return (
      <Spin className="w-100" spinning={!this.props.chartData.data.length || this.props.isFetching}>
        <div className="d-flex w-100 justify-content-between">
          <Chart
            height={400}
            width={600}
            data={data}
            scale={cols}
            forceFit
          >
            <Axis name="date" />
            <Axis name="points" />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom type="interval" position="date*points" />
          </Chart>
        </div>
      </Spin>
    );
  }

  render() {
    return (
      <div className={classes.background_div}>
        <DashBoardCard
          cardsData={this.props.cardsData}
        />
        <Tabs
          onChange={(e) => this.changeTab(e)}
          tabBarExtraContent={this.renderRadioGroup()}
          className={classes.tab_bg}
        >
          <TabPane tab="Earned" key="POINTS_EARNED">
            {this.renderChart()}
          </TabPane>
          <TabPane tab="Redeemed" key="POINTS_CONVERTED">
            {this.renderChart()}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cardsData: state.statsStore.dashBoardCards,
  chartData: state.statsStore.dashBoardChart,
  isFetching: state.statsStore.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getDashboardCardInfo: (data) => dispatch(actions.getDashboardCardInfo(data)),
  getDashboardInfoPointEarnedTable: (data) => dispatch(
    actions.getDashboardInfoPointEarnedTable(data),
  ),
  removeDashboardChartInfo: (data) => dispatch(
    actions.removeDashboardChartInfo(data),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
