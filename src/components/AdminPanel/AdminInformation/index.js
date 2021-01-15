import React from 'react';
import { Button, Spin, Upload } from 'antd';
import { Icon } from '@ant-design/compatible';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Form from '../../ui/Form';
import DefaultImage from '../../../img/group-5.png';
import classes from './index.module.css';
import * as actions from '../../../store/actions';
import Toast from '../../../utils/Toast';

class AdminInformation extends React.Component {
  fields = () => [
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
        label: (<span className="font-weight-bold">Email</span>),
      },
      componentProps: {
        placeholder: 'Email',
      },
    },
  ];

  onSubmit = (form) => async (e) => {
    const { update, user } = this.props;

    e.preventDefault();
    form.validateFields(async (err, values) => {
      const data = {};

      if (!_.isEqual(user.auth.email, values.email)) {
        _.set(data, 'user.auth.email', values.email);
      }

      if (!_.isEmpty(data)) {
        update(data);
      } else {
        Toast.infoToast('Nothing was changed');
      }
    });
  };

  image_upload = (e) => {
  };

  resetPassword = () => {
    const { resetPassword, user } = this.props;

    resetPassword({ email: _.get(user, 'auth.email') });
  };

  renderWrapper = ({ form, ...props }) => (
    <div>
      <div className="w-100" {...props} />
      <div className="d-flex justify-content-between">
        <Button
          type="primary"
          className="flex-1 mr-4"
          onClick={this.resetPassword}
        >
          Reset Password
        </Button>
        <Button
          type="primary"
          className="flex-1 ml-4"
          htmlType="submit"
          onClick={this.onSubmit(form)}
        >
          Update Info
        </Button>
      </div>
    </div>
  );

  renderForm() {
    const { isFetching, user } = this.props;

    return (
      <Form
        isFetching={isFetching}
        onSubmit={this.onSubmit}
        fields={this.fields}
        initialValues={{ email: _.get(user, 'auth.email') }}
        isButtonRemoved
        wrapper={this.renderWrapper}
      />
    );
  }

  renderImageUploader() {
    return (
      <Upload
        className={classes.uploadWrapper}
        customRequest={(...requestOptions) => console.log('data', requestOptions)}
      >
        <div className="font-weight-bold">Profile Image</div>
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={DefaultImage} alt="Profile" />
          <div className={classes.imageButton}>
            <div className={classes.icon}><Icon type="upload" /></div>
            <span className={classes.imageButtonText}>Upload Image</span>
          </div>
        </div>
      </Upload>
    );
  }

  render() {
    const { isFetching } = this.props;

    return (
      <div className={classes.wrapper}>
        <h1 className={classes.header}>Admin Information</h1>
        <Spin spinning={isFetching}>
          <div className={classes.align_div}>
            <div className={classes.form}>
              {this.renderForm()}
            </div>
            {/*{this.renderImageUploader()}*/}
          </div>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.authStore.isFetching,
  user: state.authStore.user,
});

const mapDispatchToProps = (dispatch) => ({
  update: (data) => dispatch(actions.updateUser(data)),
  resetPassword: (data) => dispatch(actions.resetPassword(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminInformation);
