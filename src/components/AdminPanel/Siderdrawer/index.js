import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Menu } from 'antd';
import { Icon } from '@ant-design/compatible';
import classes from './index.module.css';

const items = [
  {
    key: 'dashboard',
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
  },
  {
    key: 'manage-pos-users',
    path: '/admin/manage-pos-users',
    name: 'Manage POS Users',
    icon: 'cluster',
  },
  {
    key: 'set-membership-tiers',
    path: '/admin/set-membership-tiers',
    name: 'Set Membership Tiers',
    icon: 'crown',
  },
  {
    key: 'manage-customers',
    path: '/admin/manage-customers',
    name: 'Customers Stats',
    icon: 'team',
  },
  {
    key: 'manage-point-transfer',
    path: '/admin/manage-point-transfer',
    name: 'Point Transfers',
    icon: 'retweet',
  },
  {
    key: 'manage-subscription-settings',
    path: '/admin/manage-subscription-settings',
    name: 'Subscription Settings',
    icon: 'edit',
  },
];

const MenuList = ({ location, isRoot }) => {
  const renderItem = ({
    key, path, icon, name,
  }) => (
    <Menu.Item key={key}>
      <Link to={path} className="d-flex align-items-center">
        <Icon type={icon} className={classes.icon_color} />
        <span className={classes.list_item}>{name}</span>
      </Link>
    </Menu.Item>
  );

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      style={{ marginTop: '10px' }}
    >
      {_.reduce(items, (acc, cur) => {
        if (cur.key !== 'manage-subscription-settings') {
          acc.push(renderItem(cur));
        } else if (isRoot) {
          acc.push(renderItem(cur));
        }

        return acc;
      }, [])}
    </Menu>
  );
};

export default withRouter(MenuList);
