import React, { Component } from 'react';
import {
  Button, Card, Form, Spin,
} from 'antd';
import _ from 'lodash';
import classes from './index.module.css';
import UIForm from '../../ui/Form';
import { numberValidator } from '../../../utils';

class PointCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditEnabled: false,
    };
  }

  fields = () => {
    const { isEditEnabled } = this.state;

    return [
      {
        id: 'lifeTime',
        itemProps: {
          label: (<span className="mr-4">Point Expiry</span>),
          className: 'mr-5 ml-5',
        },
        componentProps: {
          className: 'w-100',
        },
        type: 'select',
        help: '',
        valueOny: !isEditEnabled,
        options: [
          {
            value: 'never',
            label: 'Never',
          },
          {
            value: 'year',
            label: 'Year',
          },
        ],
      },
      {
        id: 'calcFactor',
        valueOny: !isEditEnabled,
        help: '',
        itemProps: {
          label: 'Calculation Factor',
          className: 'mr-5 ml-5',
        },
        type: 'number',
        componentProps: {
          min: 0.1,
        },
        rules: [
          {
            message: 'Invalid value',
            validator: numberValidator({ isFloat: true, min: 0.1 }),
          },
        ],
      },
      {
        id: 'maxPurchase',
        valueOny: !isEditEnabled,
        help: '',
        itemProps: {
          label: 'Max redemption/purchase',
          className: 'mr-5 ml-5',
        },
        type: 'number',
        componentProps: {
          min: 10,
        },
        rules: [
          {
            message: 'Invalid value',
            validator: numberValidator({ min: 10 }),
          },
        ],
      },
      {
        id: 'maxPurchaseDay',
        valueOny: !isEditEnabled,
        help: '',
        itemProps: {
          label: 'Max point redemtion/day',
          className: 'mr-5 ml-5',
        },
        type: 'number',
        componentProps: {
          min: 10,
        },
        rules: [
          {
            message: 'Invalid value',
            validator: numberValidator({ min: 10 }),
          },
        ],
      },
    ];
  }

  setEdit = () => {
    this.setState((state) => ({ ...state, isEditEnabled: !state.isEditEnabled }));
  }

  onSubmit = (form) => (e) => {
    const { onSubmit, data } = this.props;
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        this.setEdit();

        onSubmit({
          id: _.get(data, '_id'),
          data: { ...values, lifeTime: _.toLower(values.lifeTime) },
        });
      }
    });
  }

  renderButtons = (form) => {
    const { isEditEnabled } = this.state;

    const cancelClick = () => {
      this.setEdit();
      form.resetFields();
    };

    if (isEditEnabled) {
      return (
        <div style={{ marginBottom: '-20px' }}>
          <Form.Item className="d-flex p-0 m-0">
            <Button
              className="mr-3"
              onClick={cancelClick}
              type="default"
              htmlType="button"
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" onClick={this.onSubmit(form)}>Save</Button>
          </Form.Item>
        </div>
      );
    }

    return (
      <Button onClick={this.setEdit} type="primary" ghost>Edit</Button>
    );
  }

  renderWrapper = ({ form, ...props }) => {
    const { isFetching } = this.props;

    return (
      <Card
        title={(<span className="ml-5 font-weight-bold">Key point calculation and redemption configuration</span>)}
        extra={this.renderButtons(form)}
        className={classes.card_main_div1}
      >
        <Spin spinning={isFetching}>
          <div {...props} className="d-flex flex-wrap" />
        </Spin>
      </Card>
    );
  }

  render() {
    const { isFetching, data } = this.props;

    return (
      <UIForm
        fields={this.fields}
        isFetching={isFetching}
        initialValues={data}
        onSubmit={this.onSubmit}
        isButtonRemoved
        layout="vertical"
        wrapper={this.renderWrapper}
      />
    );
  }
}


export default PointCurrency;
