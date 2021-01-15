import _ from 'lodash';
import React, { Component } from 'react';
import { Card, Spin } from 'antd';
import { connect } from 'react-redux';
import classes from './index.module.css';
import EditableGreedCell from '../../ui/EditableGreed';
import * as actions from '../../../store/actions';
import { numberValidator } from '../../../utils';

class LoyaltyTiers extends Component {
  columns = ([
    {
      title: 'Image',
      dataIndex: 'image',
      width: '180px',
    },
    {
      title: 'Membership Tier',
      dataIndex: 'tierName',
      type: 'input',
    },
    {
      title: 'Level',
      dataIndex: 'tierLevel',
    },
    {
      title: 'Total Spend',
      dataIndex: 'spendThreshold',
      type: 'number',
      immutable: (record) => record.tierLevel === 1,
      rules: [
        {
          message: 'Invalid value',
          validator: numberValidator({ min: 1 }),
        },
      ],
    },
    {
      title: 'Purchase Reward',
      dataIndex: 'multiplier',
      type: 'number',
      immutable: (record) => record.tierLevel === 1,
      rules: [
        {
          message: 'Invalid value',
          validator: numberValidator({ isFloat: true, min: 1 }),
        },
      ],
    },
    {
      title: 'Point Treshold',
      dataIndex: 'pointThreshold',
      immutable: (record) => record.tierLevel === 1,
      type: 'number',
      rules: [
        {
          message: 'Invalid value',
          validator: numberValidator({ min: 1 }),
        },
      ],
    },
    {
      title: 'Welcome Reward ',
      dataIndex: 'welcomeReward',
      rules: [
        {
          message: 'Invalid value',
          validator: numberValidator({ min: 1 }),
        },
      ],
    },
    {
      title: 'Birthday Reward',
      dataIndex: 'bornDayReward',
      immutable: (record) => record.tierLevel === 1,
      rules: [
        {
          message: 'Invalid value',
          validator: numberValidator({ min: 1 }),
        },
      ],
    },
    {
      title: 'Status',
      type: 'switch',
      dataIndex: 'isActive',
      immutable: (record) => record.tierLevel === 1,
      onChange: (record) => (newValue) => this.onSave({ isActive: newValue }, record),
    },
  ]);

  onSave = (data, tier) => {
    const { updateTier } = this.props;

    updateTier({ id: _.get(tier, '_id'), data });
  }

  onSaveTier = (data, tier) => {
    this.onSave(_.omit(data, 'isActive'), tier);
  }

  render() {
    const { data, isFetching } = this.props;

    const dataSource = _.map(data, (item) => _.assign(item, { key: _.get(item, '_id') }));

    return (
      <Card
        title={(<span className="ml-5 font-weight-bold">Loyalty Programs</span>)}
        className={classes.card_main_div1}
      >
        <Spin spinning={isFetching}>
          <EditableGreedCell
            columns={this.columns}
            dataSource={dataSource}
            onSave={this.onSaveTier}
          />
        </Spin>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateTier: (state) => dispatch(actions.updateTier(state)),
});


export default connect(null, mapDispatchToProps)(LoyaltyTiers);
