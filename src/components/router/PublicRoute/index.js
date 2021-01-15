import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRefreshToken } from '../../../utils/tokenService';

const PublicRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (getRefreshToken()) {
          return <Redirect {...props} to="/admin" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  user: PropTypes.objectOf(PropTypes.any),
};

const mapStateToProps = (state) => ({
  user: state.authStore,
});

export default connect(mapStateToProps, null)(PublicRoute);
