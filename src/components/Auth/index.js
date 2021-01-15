import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';
import Login from './Login';
import SignUp from './Signup';
import InvitePosUsers from '../InvitePosUsers';
import PublicRoute from '../router/PublicRoute';
import AuthContainer from './AuthContainer';
import PrivateRouteWithOutPos from '../router/PrivateRouteWithOutPos';
import ForgotPassword from './ForgotPassword';

function Auth() {
  return (
    <AuthContainer>
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PublicRoute exact path="/signup" component={SignUp} />
        <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
        <PrivateRouteWithOutPos path="/invite-pos-users" component={InvitePosUsers} exact />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </AuthContainer>
  );
}

export default Auth;
