import React from 'react';
import * as _ from 'lodash';
import { Spin, Upload } from 'antd';
import { Icon } from '@ant-design/compatible';
import { connect } from 'react-redux';
import classes from './index.module.css';
import Form from '../../ui/Form';
import FormComponent from '../../ui/FormComonent';
import DefaultImage from '../../../img/estackk.png';
import * as actions from '../../../store/actions';
import Toast from '../../../utils/Toast';
import { numberValidator } from '../../../utils';
import './switch.css';
import { apiUrl } from '../../../api/baseUrl';

class BusinessInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: 1,
      isChangePeriod: false,
      quantity: 1,
      newPrice: 0,
    };
  }

  componentDidMount() {
    const { subscription: { quantityOfPos } } = this.props;

    this.setState({ quantity: quantityOfPos, minValue: quantityOfPos });
  }

  componentDidUpdate(prevProps, prevState) {
    const { quantity, isChangePeriod } = this.state;

    if (quantity !== prevState.quantity
        || (isChangePeriod && isChangePeriod !== prevState.isChangePeriod)) {
      this.fetchPrice();
    }
  }

  fetchPrice = () => {
    const { subscription: { paymentCycle } } = this.props;
    const { quantity } = this.state;

    let type = 'boutique';
    let period = 'monthly';

    if (quantity > 1) {
      type = 'enterprise';
    }

    if (paymentCycle === 'monthly') {
      period = 'yearly';
    }

    fetch(`${apiUrl}/subscription-plan/fetch?type=${type}&period=${period}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((res) => this.setState({ newPrice: res[0].price }));
  }

  fields = (form) => {
    const { subscription: { quantityOfPos, paymentCycle, price } } = this.props;
    const {
      minValue, isChangePeriod, quantity, newPrice,
    } = this.state;

    return [
      {
        id: 'brandName',
        type: 'input',
        rules: [
          {
            required: true,
            message: 'Please input your brand name!',
            whitespace: true,
            min: 1,
          },
        ],
        itemProps: {
          label: (<span className="font-weight-bold">Brand Name</span>),
          className: 'w-100',
        },
        componentProps: {
          placeholder: 'Brand Name',
        },
      },
      {
        id: 'planType',
        type: 'select',
        disabled: quantityOfPos > 1,
        fieldOptions: {
          initialValue: quantityOfPos > 1 ? 'enterprise' : 'boutique',
        },
        itemProps: {
          label: (<span className="font-weight-bold">Choose Plan</span>),
          className: 'w-100',
        },
        componentProps: {
          onChange: (value) => {
            if (value !== 'enterprise') {
              this.setState({ minValue: 1, quantity: 1 });
              form.setFieldsValue({ quantityOfPos: 1 });
            } else {
              form.setFieldsValue({ quantityOfPos: 2 });
              this.setState({ minValue: 2, quantity: 2 });
            }
          },
        },
        options: [
          {
            value: 'boutique',
            label: 'Boutique',
          },
          {
            value: 'enterprise',
            label: 'Enterprise',
          },
        ],
      },
      {
        id: 'render',
        type: 'render',
        render: () => (
          <div className="d-flex align-items-center justify-content-between">
            <FormComponent
              form={form}
              {...{
                id: 'quantityOfPos',
                type: 'number',
                initialValue: quantityOfPos,
                itemProps: {
                  label: (<span className="font-weight-bold">No. of Stores</span>),
                },
                componentProps: {
                  className: 'mb-0',
                  min: quantityOfPos,
                  max: 20,
                  onChange: (value) => this.setState({ quantity: value }),
                },
                disabled: form.getFieldValue('planType') !== 'enterprise',
                rules: [
                  {
                    message: 'Invalid value',
                    validator: numberValidator({ min: minValue, max: 20 }),
                  },
                ],
              }
              }
            />
            <div className={classes.priceWrapper}>
              <div>
                <span className={classes.priceWrapperLabel}>
                  Subscription price:
                </span>
              </div>
              <div className={classes.priceWrapperPrice}>
                {(isChangePeriod ? newPrice : price) * quantity}
                $
              </div>
            </div>
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
                    onChange: () => this.setState({ isChangePeriod: !isChangePeriod }),
                  },
                }}
              />
            </div>
          </div>
        ),
      },
    ];
  };

  onSubmit = (form) => async (e) => {
    const { update, business, subscription } = this.props;

    e.preventDefault();
    form.validateFields(async (err, values) => {
      const data = {};

      if (!_.isEqual(business.brandName, values.brandName)) {
        _.set(data, 'business', { brandName: values.brandName });
      }

      const paymentCycle = _.get(values, 'paymentCycle') ? 'monthly' : 'yearly';
      if (!_.isEqual(subscription.paymentCycle, paymentCycle)) {
        _.set(data, 'subscription', { paymentCycle });
      }

      if (data.subscription && !_.isEqual(subscription.quantityOfPos, values.quantityOfPos)) {
        data.subscription.quantityOfPos = values.quantityOfPos;
      } else if (!_.isEqual(subscription.quantityOfPos, values.quantityOfPos)) {
        _.set(data, 'subscription', { quantityOfPos: values.quantityOfPos });
      }

      if (!_.isEmpty(data)) {
        update(data);
      } else {
        Toast.infoToast('Nothing was changed');
      }
    });
  };

  renderForm() {
    const { isFetching, business: { brandName } } = this.props;

    return (
      <Form
        isFetching={isFetching}
        initialValues={{
          brandName,
        }}
        className="customSwitch"
        buttonName="Update Info"
        onSubmit={this.onSubmit}
        fields={this.fields}
      />
    );
  }

  renderImageUploader() {
    const { uploadAvatar, business } = this.props;
    return (
      <Upload
        className={classes.uploadWrapper}
        showUploadList={false}
        customRequest={(data) => {
          const fromData = new FormData();
          fromData.append('file', data.file);
          uploadAvatar({ file: fromData, onSuccess: data.onSuccess });
        }}
      >
        <div className="mb-2 font-weight-bold">Business Image</div>
        <div className={classes.imageWrapper}>
          <img
            className={classes.image}
            src={business.image ? business.image.ref : DefaultImage}
            alt="Profile"
          />
          <div className={classes.imageButton}>
            <div className={classes.icon}><Icon type="upload" /></div>
            <div className={classes.imageButtonText}><span>Upload Image</span></div>
          </div>
        </div>
      </Upload>
    );
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className={classes.wrapper}>
        <Spin spinning={isFetching}>
          <div className={classes.align_div}>
            <div className={classes.form}>
              {this.renderForm()}
            </div>
            {this.renderImageUploader()}
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.businessStore.isFetching,
  business: state.businessStore.business,
  subscription: state.businessStore.subscription,
});

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(actions.updateSelf(data)),
  uploadAvatar: (data) => dispatch(actions.updateBusinessAvatar(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BusinessInformation);
