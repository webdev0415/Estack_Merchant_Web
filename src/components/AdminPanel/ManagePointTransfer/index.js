import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import classes from './index.module.css';
import * as actions from '../../../store/actions';

const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'transactionId',
  },
  {
    title: 'Customer ID',
    dataIndex: 'customerId',
  },
  {
    title: 'Points Earned/ Redeemed',
    dataIndex: 'points',
  },
  {
    title: 'Coupon Code',
    dataIndex: 'couponId',
  },
  {
    title: 'Money Value',
    dataIndex: 'currency',
  },
  {
    title: 'POS ID',
    dataIndex: 'posId',
  },
  {
    title: 'DateTime Stamp',
    dataIndex: 'createdAt',
  },

];

class ManagePointTransfer extends React.Component {
  componentDidMount() {
    const { getTransactionsList } = this.props;
    getTransactionsList();
  }

  render() {
    const { isFetching, transactionsList } = this.props;

    return (
      <div className={classes.background_div}>
        <h1 className={classes.point_transfer_header}>Point Transactions</h1>
        <Table
          columns={columns}
          dataSource={transactionsList}
          loading={isFetching}
        />
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  transactionsList: state.statsStore.transactionsList,
  isFetching: state.statsStore.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionsList: () => dispatch(actions.getTransactionsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagePointTransfer);
