import React, { Component } from 'react';
import * as _ from 'lodash';
import { Divider } from 'antd';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import googleLogo from '../../../img/google.svg';
import classes from './signup.module.css';
import Form from '../../ui/Form';
import * as actions from '../../../store/actions';
import FormComponent from '../../ui/FormComonent';
import { numberValidator } from '../../../utils';
import config from '../../../config';
import './switch.css';
import { apiUrl } from '../../../api/baseUrl';

class SignUp extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    signUp: PropTypes.func,
    signUpWithOTPGeneration: PropTypes.func,
    signUpWithOTPConfirm: PropTypes.func,
    signUpWithCreateMerchant: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showSetPassPage: false,
      doesUserMadeAction: false,
      token: null,
      plans: [],
      period: true,
      minValue: 1,
    };
  }

  componentDidMount() {
    this.fetchPlan('boutique');
  }

  fetchPlan = (type) => fetch(`${apiUrl}/subscription-plan/fetch?type=${type}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((plans) => this.setState({ plans }));

  setCheck= () => {
    const { period } = this.state;

    this.setState({ period: !period });
  }

  cost= () => {
    const { period, plans } = this.state;

    const periodData = period ? 'monthly' : 'yearly';

    const index = plans.findIndex((i) => (i.period === periodData));

    return plans.length ? plans[index].price : 100;
  }

fields = (form) => {
  const { showSetPassPage: isPassPageShown, token, minValue } = this.state;
  const showSetPassPage = isPassPageShown && !token;
  const {isExist} = this.props;
  console.log("isExist", isExist)
  return [
    {
      id: 'brandName',
      type: 'input',
      rules: [
        {
          required: true,
          message: 'Please input your brand name!',
          whitespace: true,
        },
      ],
      itemProps: {
        className: 'w-100',
      },
      hidden: showSetPassPage,
      componentProps: {
        placeholder: 'Brand Name',
        autoFocus: true,
      },
    },
    
    {
      id: 'planType',
      type: 'select',
      fieldOptions: {
        initialValue: 'boutique',
      },
      hidden: showSetPassPage,
      itemProps: {
        className: 'w-100',
      },
      componentProps: {
        onChange: (value) => {
          this.fetchPlan(value);

          if (value !== 'enterprise') {
            this.setState({ minValue: 1 });
            form.setFieldsValue({ quantityOfPos: 1 });
          } else {
            form.setFieldsValue({ quantityOfPos: 2 });
            this.setState({ minValue: 2 });
          }
        },
      },
      options: [
        {
          value: 'boutique',
          label: (
            <>
              <span className={classes.dropdown_span}>Choose Plan : </span>
              <span>Boutique</span>
            </>
          ),
        },
        {
          value: 'enterprise',
          label: (
            <>
              <span className={classes.dropdown_span}>Choose Plan : </span>
              <span>Enterprise</span>
            </>
          ),
        },
      ],
    },
    {
      id: 'quantityOfPos',
      type: 'render',
      hidden: showSetPassPage,
      render: () => (
        <table width="100%">
          <tbody>
            <tr>
              <td>
                {/* кослыть потому что, у antd у Item margin-bottom 20px !important */}
                <div style={{ marginBottom: 20 }}>
                  <span className="font-weight-light pr-2" style={{opacity: .5}}>Number of Stores:</span>
                </div>
              </td>
              <td>
                <FormComponent
                  form={form}
                  {...{
                    id: 'quantityOfPos',
                    type: 'number',
                    fieldOptions: {
                      initialValue: 1,
                    },
                    hidden: showSetPassPage,
                    componentProps: {
                      className: 'mb-0',
                      min: minValue,
                    },
                    rules: [
                      {
                        message: 'Invalid value',
                        validator: numberValidator({ min: minValue, max: 20 }),
                      },
                    ],
                    disabled: form.getFieldValue('planType') !== 'enterprise',
                  }
                  }

                />
              </td>
              <td align="right">
                <div className="customSwitch">
                  <FormComponent
                    form={form}
                    setCheck={this.setCheck}
                    {...{
                      id: 'paymentCycle',
                      type: 'switch',
                      fieldOptions: {
                        initialValue: false,
                      },
                      hidden: showSetPassPage,
                      componentProps: {
                        className: classes.switch_btn,
                        checkedChildren: 'Yearly',
                        unCheckedChildren: 'Monthly',
                      },
                    }}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mb-5">
                  <span className="font-weight-light pr-2 mb-4" style={{opacity: .5}}>Subscription Amount:</span>
                </div>
              </td>
              <td colSpan="2">
                <div className="mb-5">
                  <span className="font-weight-bold mb-4">
                    {`$${(form.getFieldValue('quantityOfPos') ? form.getFieldValue('quantityOfPos') : 1) * this.cost()}`}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ),
    },
    {
      id: 'CreditcardRequired',
      type: 'render',
      hidden: showSetPassPage,
      render: () => (
        <p style={{color: '#4076D9', fontFamiliy: 'Roboto', marginBottom: '-15px'}}>No credit card required. Free till you reach 100 customers</p>
      ),
    },

    {
      id: 'DividerHr',
      type: 'render',
      hidden: showSetPassPage,
      render: () => (
        <Divider />
      ),
    },
    {
      id: 'email',
      type: 'input',
      rules: [
        {
          type: 'email',
          message: 'Please input your Email!',
          required: true,
        },
      ],
      itemProps: {
        className: 'w-100',
      },
      hidden: showSetPassPage || !!token,
      componentProps: {
        placeholder: 'Email',
      },
    },
    {
      id: 'isExist',
      type: 'render',
      hidden: !showSetPassPage,
      render: () => (
        <p>Merchant exists with this email address. Enter the OTP sent to email address to login.</p>
      ),
    },
    {
      id: 'code',
      type: 'opt',
      hidden: !showSetPassPage,
      rules: [
        {
          required: showSetPassPage,
          message: 'Please input the code!',
          whitespace: true,
        },
      ],
      itemProps: {
        className: 'w-100',
      },
      componentProps: {
        autoFocus: true,
      },
    },
    // {
    //   id: 'password',
    //   type: 'input',
    //   hidden: !showSetPassPage,
    //   rules: [
    //     {
    //       min: 8,
    //       required: showSetPassPage,
    //       message: 'Please input your password!',
    //       whitespace: true,
    //     },
    //   ],
    //   itemProps: {
    //     className: 'w-100',
    //   },
    //   componentProps: {
    //     type: 'password',
    //     placeholder: 'Password',
    //     autoFocus: true,
    //   },
    // },
    // {
    //   id: 'confirmPassword',
    //   type: 'input',
    //   hidden: !showSetPassPage,
    //   rules: [
    //     {
    //       required: showSetPassPage,
    //       message: 'Please input your password!',
    //       whitespace: true,
    //     },
    //     { validator: this.validateMatchPasswords(form) },
    //   ],
    //   itemProps: {
    //     className: 'w-100',
    //   },
    //   componentProps: {
    //     type: 'password',
    //     placeholder: 'Confirm password',
    //   },
    // },
  ];
};

  validateMatchPasswords = (from) => (rule, value, callback) => {
    const password = from.getFieldValue('password');

    if (value && password !== value) {
      callback('Two passwords that you enter is inconsistent!');
    }
    callback();
  };

  defaultRegistrationHandler = (form) => (e) => {
    e.preventDefault();
    const { showSetPassPage, token } = this.state;
    const { signUpGoogle, signUpWithOTPGeneration, signUpWithOTPConfirm, signUpWithCreateMerchant } = this.props;
    const {isExist} = this.props;

    if (token) {
      form.validateFields((err, values) => {
        if (!err) {
          const data = _.assign(values, {
            paymentCycle: _.get(values, 'paymentCycle') ? 'monthly' : 'yearly',
          });
          this.setState({ doesUserMadeAction: true });
          signUpGoogle({ token, payload: data });
        }
      });
    } else if (!showSetPassPage) {
      form.validateFields((err, values) => {
        if (!err) {
          localStorage.setItem('userRegData', JSON.stringify(values));
          this.setState({ showSetPassPage: true });
          signUpWithOTPGeneration(values)
        }
      });
    } else {
      form.validateFields(async (err, { code }) => {
        if (!err) {
          const values = JSON.parse(localStorage.getItem('userRegData'));
          const data = _.assign(values, {
            paymentCycle: _.get(values, 'paymentCycle') ? 'monthly' : 'yearly',
            code,
          });
          console.log("data", data)
          this.setState({ doesUserMadeAction: true });
          this.setState({ showSetPassPage: false });
          if (isExist) {
            signUpWithOTPConfirm(data);
          } else {
            signUpWithCreateMerchant(data)
          }
          
        }
      });
    }
  };

  googleErrorHandler = (response) => {
    console.log(response);
  };

  googleRegistrationHandler = (googleUser) => {
    const { accessToken } = googleUser;
    this.setState({ token: accessToken });
  };

  renderGoogleRegistration = () => (
    <div style={{ textAlign: 'center' }}>
      <GoogleLogin
        ref={this.reference}
        className={classes.oauth}
        clientId={config.Client_ID}
        icon={false}
        onSuccess={this.googleRegistrationHandler}
        onFailure={this.googleErrorHandler}
        cookiePolicy="single_host_origin"
      >
        <div style={{ marginBottom: 5, marginTop: 5 }}>
          <img
            alt="google logo"
            style={{ height: '15px', marginRight: '10px' }}
            src={googleLogo}
          />
          Sign up with Google
        </div>
      </GoogleLogin>
    </div>
  );

  renderDefaultRegistration() {
    const { showSetPassPage, doesUserMadeAction } = this.state;
    const { isFetching } = this.props;

    return (
      <Form
        className="d-flex flex-wrap"
        onSubmit={this.defaultRegistrationHandler}
        initialValues={JSON.parse(localStorage.getItem('userRegData'))}
        fields={this.fields}
        buttonName={showSetPassPage ? 'Confirm' : 'Register'}
        isFetching={doesUserMadeAction && isFetching}
      />
    );
  }

  render = () => {
    const { showSetPassPage, token } = this.state;
    return (
      <div className={classes.login_form}>
        <h2 className={classes.header}>Member Registration</h2>

        {this.renderDefaultRegistration()}
        {showSetPassPage || !!token ? null : (
          <>
            

            <Divider dashed="true" className={classes.or}>
              or
            </Divider>
            {this.renderGoogleRegistration()}
          </>
        )}
        <p style={{textAlign: 'center', fontFamiliy: 'Roboto', paddingTop: '1em'}}>
          <Link to="/" style={{color: '4076D9'}}>Already have an account?</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  isFetching: store.authStore.isFetching,
  isExist: store.authStore.isExist,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (state) => dispatch(actions.signUp(state)),
  signUpGoogle: (state) => dispatch(actions.signUpGoogle(state)),
  signUpWithOTPGeneration: (state) => dispatch(actions.signUpWithOTPGeneration(state)),
  signUpWithOTPConfirm: (state) => dispatch(actions.signUpWithOTPConfirm(state)),
  signUpWithCreateMerchant: (state) => dispatch(actions.signUpWithCreateMerchant(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
