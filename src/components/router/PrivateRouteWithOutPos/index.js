import React from 'react';
import _ from 'lodash';
import { Spin } from 'antd';
import { Redirect, Route } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRefreshToken } from '../../../utils/tokenService';
import * as actions from '../../../store/actions';

class PrivateRouteWithOutPos extends React.Component {
  componentDidMount() {
    const { getSelf, authStore } = this.props;
    const { user } = authStore;

    if (_.isEmpty(user)) {
      getSelf();
    }
  }

  render() {
    const {
      component: Component, authStore, ...rest
    } = this.props;
    const { isFetching } = authStore;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (getRefreshToken()) {
            return (
              <Spin
                spinning={isFetching}
                size="large"
                tip="Loading..."
                className="position-fixed d-flex min-vh-100 min-vw-100 align-items-center justify-content-center"
              >
                <Component {...props} />
              </Spin>
            );
          }

          return <Redirect {...props} to="/" />;
        }}
      />
    );
  }
}

PrivateRouteWithOutPos.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  getSelf: PropTypes.func,
  authStore: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => ({
  authStore: state.authStore,
});

const mapDispatchToProps = (dispatch) => ({
  getSelf: () => dispatch(actions.getSelf()),
});


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWithOutPos);
