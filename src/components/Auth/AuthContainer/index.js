import React from 'react';
import classes from './index.module.css';
import estackkLogo from '../../../img/group-3.png';

const AuthContainer = ({ children }) => (
  <div className={classes.auth_page}>
    <div>
      <img alt="logo" className={classes.logo_margin} src={estackkLogo} />
    </div>
    {children}
  </div>
);

export default AuthContainer;
