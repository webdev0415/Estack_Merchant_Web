import React, { useState } from 'react';

import { Modal, Button } from 'antd';
import * as _ from 'lodash';
import FormComponent from '../../ui/FormComonent';
import Form from '../../ui/Form';
import { numberValidator } from '../../../utils';

const ModalComponent = ({ createSubscriptionPlan }) => {
  const [state, setState] = useState({ visible: false });

  const showModal = () => setState({ visible: true });

  const handleCancel = () => setState({ visible: false });

  const onSubmit = (form) => async (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      const data = { type: 'individual' };

      data.period = _.get(values, 'paymentCycle') ? 'monthly' : 'yearly';
      data.price = values.price;

      setState({ visible: false });

      createSubscriptionPlan(data);
    });
  };

  const fields = (form) => {
    const paymentCycle = 'monthly';

    return [
      {
        id: 'render',
        type: 'render',
        render: () => (
          <div className="d-flex align-items-center justify-content-between">
            <FormComponent
              form={form}
              {...{
                id: 'price',
                type: 'number',
                initialValue: 100,
                componentProps: {
                  className: 'mb-0',
                },
                itemProps: {
                  label: (<span className="font-weight-bold">Price</span>),
                  style: { width: 85 },
                },
                rules: [
                  {
                    message: 'Invalid value',
                    validator: numberValidator({ min: 1 }),
                  },
                ],
              }
                            }
            />
            <div>
              <FormComponent
                form={form}
                {...{
                  id: 'paymentCycle',
                  type: 'switch',
                  initialValue: _.isEqual(paymentCycle, 'monthly'),
                  itemProps: {
                    label: (<span className="font-weight-bold">Billing Cycle</span>),
                    style: { width: 85 },
                  },
                  componentProps: {
                    checkedChildren: 'Monthly',
                    unCheckedChildren: 'Yearly',
                  },
                }}
              />
            </div>
          </div>
        ),
      },
    ];
  };

  const renderWrapper = ({ form, ...props }) => (
    <div>
      <div className="w-100" {...props} />
      <div className="d-flex justify-content-between">
        <Button
          type="primary"
          className="flex-1 mr-4"
          htmlType="submit"
          onClick={() => onSubmit(form)}
        >
          Create
        </Button>
        <Button
          className="flex-1 ml-4"
          htmlType="submit"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  const brandName = 'brandName';

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create new
      </Button>
      <Modal
        title="Create individual subscription plan"
        visible={state.visible}
        footer={null}
        onCancel={handleCancel}
      >
        <div>
          <Form
            initialValues={{
              brandName,
            }}
            onSubmit={onSubmit}
            className="customSwitch"
            buttonName="Create"
            fields={fields}
            wrapper={renderWrapper}
            isButtonRemoved
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
