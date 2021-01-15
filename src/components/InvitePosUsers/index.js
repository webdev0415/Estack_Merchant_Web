import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import * as actions from '../../store/actions';
import Form from '../ui/Form';
import classes from './index.module.css';


class InvitePosUsers extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    signUp: PropTypes.func,
  };

  fields = (quantity) => () => {
    const fieldList = [];

    for (let i = 0; i < quantity; i += 1) {
      fieldList.push({
        id: `email_${i}`,
        type: 'input',
        rules: [
          {
            type: 'email',
            message: 'Please input POS Email!',
            required: i < 1,
          },
        ],
        itemProps: {
          className: 'w-100',
        },
        componentProps: {
          placeholder: 'Email',
        },
      });
    }

    return fieldList;
  };

  onSubmit = (form) => (e) => {
    e.preventDefault();

    const { invitePoses } = this.props;

    form.validateFields(async (err, emailList) => {
      if (!err) {
        await invitePoses({ emails: _.map(emailList, (x) => x) });
      }
    });
  };


  renderForm() {
    const { isFetching, subscription } = this.props;

    return (
      <Form
        className="d-flex flex-wrap"
        onSubmit={this.onSubmit}
        fields={this.fields(subscription.quantityOfPos)}
        buttonName="Invite"
        isFetching={isFetching}
      />
    );
  }

  render() {
    const { history, poses } = this.props;

    if (_.size(poses) >= 1) {
      history.push('/');
    }

    return (
      <div className={classes.form}>
        <h2 className={classes.header}>Invite POS Users</h2>
        <p className={classes.subHeader}>Specify POS User Emails to Invite</p>
        {this.renderForm()}
      </div>
    );
  }
}


const
  mapStateToProps = (store) => ({
    isFetching: store.businessStore.isFetching,
    poses: store.businessStore.poses,
    subscription: store.businessStore.subscription,
  });

const
  mapDispatchToProps = (dispatch) => ({
    invitePoses: (state) => dispatch(actions.invitePoses(state)),
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvitePosUsers));
