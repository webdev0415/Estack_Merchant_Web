import React from 'react';
import { Table } from 'antd';
import { connect } from 'react-redux';
import classes from './index.module.css';

const columns = [
  {
    title: 'Customer ID',
    dataIndex: 'id',
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
  },
  {
    title: 'Joined on',
    dataIndex: 'joinedAt',
  },
  {
    title: 'Points Earned',
    dataIndex: 'pointsEarned',
  },
  {
    title: 'Points Redeemed',
    dataIndex: 'pointsRedeemed',
  },
  {
    title: 'Point Balance',
    dataIndex: 'pointBalance',
  },
  {
    title: 'Membership Tier',
    dataIndex: 'tier',
  },
];

const ManageCustomers = ({ isFetching, customersList }) => (
  <div className={classes.background_div}>
    <h1 className={classes.cutstomer_table_header}>Customer List</h1>
    <Table
      columns={columns}
      dataSource={customersList}
      loading={isFetching}
    />
  </div>

);

const mapStateToProps = (state) => ({
  customersList: state.statsStore.customersList,
  isFetching: state.statsStore.isFetching,
});

export default connect(mapStateToProps, null)(ManageCustomers);
