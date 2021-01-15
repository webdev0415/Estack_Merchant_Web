import {
  Layout, Menu, Popover,
} from 'antd';
import { Icon } from '@ant-design/compatible';
import React from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import logo from '../../../img/group-5.png';
import classes from './index.module.css';

const content = ({ pathname: pathName }) => (
  <Menu selectedKeys={[pathName]}>
    <Menu.Item key="/admin/my-account/">
      <Link to="/admin/my-account">My Account</Link>
    </Menu.Item>
    <Menu.Item key="/admin/manage-pos-users">
      <Link to="/admin/manage-pos-users">Switch to POS</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/admin/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);

content.propTypes = {
  pathname: PropTypes.string,
};

const Header = ({
  collapsed, setCollapsed, location, business: { brandName },
}) => (
  <>
    <Layout.Header />
    <Layout.Header className={classNames(!collapsed && classes.collapsedTollBar, classes.tollBar)}>
      <div className="d-flex align-items-center ml-5">
        <Icon
          className={classes.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={() => setCollapsed(!collapsed)}
        />
        <span className={classes.brandName}>{brandName}</span>
      </div>
      <div className="d-flex align-items-center mr-5 ml-5">
        <Popover content={content(location)} trigger="hover" placement="bottomRight">
          <img src={logo} className={classes.userImage} alt="logo" />
        </Popover>
      </div>
    </Layout.Header>
  </>
);

Header.propTypes = {
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
  location: PropTypes.objectOf(PropTypes.any),
  business: PropTypes.objectOf(PropTypes.any),
};

export default Header;
