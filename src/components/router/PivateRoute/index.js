import React from 'react';
import _ from 'lodash';
import { Spin } from 'antd';
import { Redirect, Route } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getRefreshToken } from '../../../utils/tokenService';
import * as actions from '../../../store/actions';
import Interceptor from '../Intercepor';

class PrivateRoute extends React.Component {
  componentDidMount() {
    const { getSelf, authStore } = this.props;
    const { merchant } = authStore;
    if (_.isEmpty(merchant)) {
      getSelf();
    }
  }

  render() {
    const {
      component: Component, authStore, poses, ...rest
    } = this.props;
    const { isFetching, merchant } = authStore;

    return (
      <>
        <Route
          {...rest}
          render={(props) => {
            if (getRefreshToken()) {
              if (isFetching || _.isEmpty(merchant)) {
                return (
                  <>
                    <Interceptor />
                    <Spin
                      spinning
                      size="large"
                      tip="Loading..."
                      className="position-fixed d-flex min-vh-100 min-vw-100 align-items-center justify-content-center"
                    >
                      <div />
                    </Spin>
                  </>
                );
              }
              return (
                  <>
                    <Interceptor />
                    <Component {...props} />
                  </>
              )
              // if (_.size(poses) > 0) {
              //   return (
              //     <>
              //       <Interceptor />
              //       <Component {...props} />
              //     </>
              //   );
              // }

              // if (this.props.location.pathname !== '/invite-pos-users') {
              //   return this.props.history.push('/invite-pos-users');
              // }
            }

            return <Redirect {...props} to="/" />;
          }}
        />
      </>
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  getSelf: PropTypes.func,
  authStore: PropTypes.objectOf(PropTypes.any),
  poses: PropTypes.arrayOf(PropTypes.any),
};

const mapStateToProps = (state) => ({
  authStore: state.authStore,
  poses: state.businessStore.poses,
});

const mapDispatchToProps = (dispatch) => ({
  getSelf: () => dispatch(actions.getSelf()),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
