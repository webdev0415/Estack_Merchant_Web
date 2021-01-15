import React from 'react';
import { Card } from 'antd';
import moment from 'moment';
import clsx from 'clsx';
import classes from './index.module.css';
import config from '../../../config';

const NotificationsPanel = ({ subscription, customersCount }) => {
  const { endOfSubscription, currentEnd, isActive } = subscription;

  if (isActive === false) {
    return (
      <Card className={classes.card_main}>
        <div className={clsx(classes.card_main_div, classes.alert)}>
          {
              'You didn\'t renew your subscription. '
              + 'Your store is offline. '
              + 'Please renew subscription to continue enjoying our services.'
            }
        </div>
      </Card>
    );
  }

  if (moment().isAfter(moment(endOfSubscription))
        && moment().isBefore(moment(currentEnd))) {
    return (
      <Card className={classes.card_main}>
        <div className={clsx(classes.card_main_div, classes.alert)}>
          {
              `You need to pay before ${moment(currentEnd).format('LL')}. 
               Don’t forget to renew subscription to continue enjoying our services.`
            }
        </div>
      </Card>
    );
  }

  if (moment().isAfter(moment(endOfSubscription))
        && moment().isAfter(moment(currentEnd))
        && isActive === true) {
    return (
      <Card className={classes.card_main}>
        <div className={classes.card_main_div}>
          Enjoy all the features free! till you have 100 customers using Estackk.
          We charge you only when we help you grow your business.
          Don't forget to buy subscription to continue enjoying our services.
        </div>
        <div>
          {
                `You current number of customers: ${config.customersNum <= customersCount ? config.customersNum : customersCount}.`
              }
        </div>
      </Card>
    );
  }

  return null;
};

export default NotificationsPanel;
