import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../../router/PivateRoute';
import DashBoard from '../Dashbord';
import ManageCustomers from '../ManageCustomers';
import ManagePointTransfer from '../ManagePointTransfer';
import ManagePosUsers from '../ManagePos';
import SubscriptionContainer from '../ManageSubscription';
import BusinessConfiguration from '../BusinessConfiguration';
import MyAccount from '../MyAccountLoyaut';
import Logout from '../../Auth/Logout/logout';


const AdminPanelLayout = () => (
  <Switch>
    <PrivateRoute path="/admin/dashboard" component={DashBoard} exact />
    <PrivateRoute path="/admin/manage-customers" component={ManageCustomers} exact />
    <PrivateRoute path="/admin/manage-point-transfer" component={ManagePointTransfer} exact />
    <PrivateRoute path="/admin/manage-pos-users" component={ManagePosUsers} exact />
    <PrivateRoute path="/admin/manage-subscription-settings" component={SubscriptionContainer} exact />
    <PrivateRoute path="/admin/my-account" component={MyAccount} />
    <PrivateRoute path="/admin/set-membership-tiers" component={BusinessConfiguration} exact />
    <PrivateRoute path="/admin/logout" component={Logout} exact />
    <Route path="/admin" component={() => (<Redirect to="/admin/dashboard" />)} exact />
  </Switch>
); 
export default AdminPanelLayout;
