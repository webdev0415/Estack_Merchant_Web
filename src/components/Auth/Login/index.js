import React from 'react';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Form from '../../ui/Form';
import googleLogo from '../../../img/google.svg';
import classes from './login.module.css';
import * as actions from '../../../store/actions';
import config from '../../../config';
import * as _ from 'lodash';
import OTPIcon from '../../../img/otpicon.svg';

class Login extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    login: PropTypes.func,
    loginOtp: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      doesUserMadeAction: false,
    };
  }

  fields = () => {
    const {isExist} = this.props;
    return [
    {
      id: 'email',
      type: 'input',
      hidden: isExist,
      rules: [
        {
          message: 'Please input your Email!',
          required: true,
        },
      ],
      itemProps: {
        className: 'w-100',
      },
      componentProps: {
        placeholder: 'Email',
      },
    },
    {
      id: 'code',
      type: 'opt',
      hidden: !isExist,
      rules: [
        {
          required: isExist,
          message: 'Please input the code!',
          whitespace: true,
        },
      ],
      itemProps: {
        className: 'w-100 login_otp',
      },
      componentProps: {
        autoFocus: true,
      },
    },
    // {
    //   id: 'password',
    //   type: 'input',
    //   rules: [
    //     {
    //       message: 'Please input your password!',
    //       required: true,
    //       whitespace: true,
    //     },
    //   ],
    //   itemProps: {
    //     className: 'w-100',
    //   },
    //   componentProps: {
    //     type: 'password',
    //     placeholder: 'Password',
    //   },
    // },
  ]};

  onSubmit = (form) => (e) => {
    e.preventDefault();
    const { loginOtp, loginOtpConfirm } = this.props;
    const {isExist} = this.props
    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ doesUserMadeAction: true });
        if (!isExist) {
          localStorage.setItem('loginEmail', JSON.stringify(values));
          loginOtp(values);
        } else if (isExist) {
          const params = JSON.parse(localStorage.getItem('loginEmail'));
          const data = _.assign(params, {code: values.code})
          loginOtpConfirm(data)
        }
      }
    });
  };


  onGoogleSignIn = ({ accessToken }) => {
    const { loginGoogle } = this.props;
    loginGoogle({ token: accessToken });
  };

  renderGoogleAuthorization = () => (
    <div className="pb-2 pt-2 mb-4 mt-4 d-flex justify-content-center">
      <GoogleLogin
        clientId={config.Client_ID}
        icon={false}
        onSuccess={this.onGoogleSignIn}
        onFailure={this.googleErrorHandler}
        cookiePolicy="single_host_origin"
      >
        <p style={{ marginBottom: 5, marginTop: 5 }}>
          <img alt="google logo" style={{ height: '15px', marginRight: '10px' }} src={googleLogo}/>
          Sign in with Google
        </p>
      </GoogleLogin>
    </div>
  );

  renderDefaultAuthorization = () => {
    const { isFetching } = this.props;
    const { doesUserMadeAction } = this.state;

    return (
      <Form
        className="d-flex flex-wrap"
        onSubmit={this.onSubmit}
        fields={this.fields}
        buttonName="Login"
        isFetching={doesUserMadeAction && isFetching}
      />
    );
  };

  render = () => {
    const {isExist} = this.props;
    // const register_txt = isExist ? 'otp_txt' : ''
    return (
    <div className={classNames(classes.login_form)}>
    {!isExist && <h2 className={classes.header}>Member Login</h2>}
      

      {!isExist && this.renderGoogleAuthorization()}
      { !isExist && (<Divider dashed="true" className={classes.or}>
              or
            </Divider>)}
      {
        isExist && <div style={{textAlign: 'center', marginTop: '-33px'}}><img alt="OTPIcon" src={OTPIcon} /></div>
      }
      <div style={{textAlign: 'center'}}>
      {
        isExist && <h3 style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: '14px', lineHeight: '16px'}}>Enter OTP</h3>
      }
      {this.renderDefaultAuthorization()}
      </div>
      <div className="
      align-items-center justify-content-between">
        <div className={`${classes.goto_register} ${isExist ? "otp_txt" : ""}`}>
          <Link to="/signup">Not a member? Sign Up</Link>
        </div>
        {/*<div className={classes.goto_register}>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>*/}
      </div>
    </div>
  )};
}

const mapStateToProps = (store) => ({
  isFetching: store.authStore.isFetching,
  isExist: store.authStore.isExist,
});

const mapDispatchToProps = (dispatch) => ({
  login: (state) => dispatch(actions.login(state)),
  loginOtp: (state) => dispatch(actions.loginOtp(state)),
  loginOtpConfirm: (state) => dispatch(actions.loginOtpConfirm(state)),
  loginGoogle: (state) => dispatch(actions.loginGoogle(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
