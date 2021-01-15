import _ from 'lodash';
import React from 'react';
import { Menu } from 'antd';
import { Link, Redirect, Switch } from 'react-router-dom';
import { Route, withRouter } from 'react-router';
import classes from './index.module.css';
import BusinessInformation from '../BusinessInformation';
import AdminInformation from '../AdminInformation';
import PaymntInformation from '../PaymentInformation';
import PrivateRoute from '../../router/PivateRoute';

class MyAccount extends React.Component {
  menus = [
    {
      path: '/admin/my-account/business-information',
      name: 'Business Information',
    },
    {
      path: '/admin/my-account/admin-information',
      name: 'Admin Information',
    },
    {
      path: '/admin/my-account/payment-information',
      name: 'Payment Information',
    },
  ]

  getMenuStyle = (path) => {
    const { location } = this.props;

    return {
      backgroundColor: (location.pathname === path) ? '#e6f7ff' : 'white',
      borderRight: (location.pathname === path) ? '4px solid #36c6e8' : 'white',
    };
  }

  renderMenuItem = ({ path, name }) => (
    <Menu.Item
      key={path}
      className={classes.menuItem}
      style={this.getMenuStyle(path)}
    >
      <Link to={path}>{name}</Link>
    </Menu.Item>
  );

  renderMenu() {
    return (
      <Menu mode="vertical">{_.map(this.menus, this.renderMenuItem)}</Menu>
    );
  }

  renderLayout() {
    return (
      <Switch>
        <PrivateRoute path="/admin/my-account/business-information" component={BusinessInformation} />
        <PrivateRoute path="/admin/my-account/admin-information" component={AdminInformation} />
        <PrivateRoute path="/admin/my-account/payment-information" component={PaymntInformation} />
        <Route path="/admin/my-account/" render={() => (<Redirect to="/admin/my-account/business-information" />)} />
      </Switch>
    );
  }

  render() {
    return (
      <>
        <div className={classes.myAccountHeader}>
          <span>Profile / My Account</span>
        </div>
        <div className={classes.background}>
          {this.renderMenu()}
          {this.renderLayout()}
        </div>
      </>
    );
  }
}

export default withRouter(MyAccount);
