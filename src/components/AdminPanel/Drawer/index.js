import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import classNames from 'classnames';
import logo from '../../../img/group-5.png';
import MenuList from '../Siderdrawer';
import classes from './index.module.css';

const Sider = ({ isOpen, isRoot }) => (
  <>
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={!isOpen}
      className={classNames(classes.siderWidth, classes.sider)}
    >
      <Layout.Header className={classes.logoHeader}>
        <div className="d-flex align-items-center justify-content-center flex-1">
          <img className={classes.image} src={logo} alt="logo" />
        </div>
        {isOpen && <span className={classes.logo}>Estackk</span>}
      </Layout.Header>
      <MenuList isRoot={isRoot} />
    </Layout.Sider>
    <div className={isOpen ? classes.siderWidth : classes.siderWidthCollapsed} />
  </>
);

Sider.propTypes = {
  isOpen: PropTypes.bool,
  isRoot: PropTypes.bool,
};

export default Sider;
