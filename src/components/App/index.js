import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import { ToastContainer } from 'react-toastify';
import Auth from '../Auth';
import DashBoard from '../AdminPanel';

export default () => (
  <BrowserRouter>
    <ToastContainer />
    <Switch>
      <Route path="/admin" component={DashBoard} />
      <Route path="/" component={Auth} />
    </Switch>
  </BrowserRouter>
);
