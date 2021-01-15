import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Form from '../../ui/Form';
import classes from './login.module.css';
import * as actions from '../../../store/actions';

class ForgotPassword extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    resetPassword: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      doesUserMadeAction: false,
    };
  }


  fields = () => ([
    {
      id: 'email',
      type: 'input',
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
  ]);

  onSubmit = (form) => (e) => {
    e.preventDefault();
    const { resetPassword } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        this.setState({ doesUserMadeAction: true });
        resetPassword(values);
      }
    });
  };

  renderDefaultAuthorization = () => {
    const { isFetching } = this.props;
    const { doesUserMadeAction } = this.state;

    return (
      <Form
        className="d-flex flex-wrap"
        onSubmit={this.onSubmit}
        fields={this.fields}
        buttonName="Send new password"
        isFetching={doesUserMadeAction && isFetching}
      />
    );
  };

  render = () => (
    <div className={classNames(classes.login_form, 'pb-5 pt-5')}>
      <h2 className={classes.header}>Forgot Password</h2>
      {this.renderDefaultAuthorization()}
      <div className={classes.goto_register}>
        <Link to="/">Go to login</Link>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => ({
  isFetching: store.authStore.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (data) => dispatch(actions.resetPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
