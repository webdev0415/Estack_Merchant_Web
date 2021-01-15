import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import WrapperComponent from './wrapper';
import './overrides.css';

const SubscriptionContainer = ({
  getSubscriptionPlan,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  roles,
  subscription,
  updateSubscription,
}) => {
  const isRoot = roles && roles.includes('root');

  const data = useCallback(() => (subscription.results ? subscription.results.reduce((acc, cur) => {
    if (cur.type === 'individual') {
      acc.individual.push({
        // eslint-disable-next-line no-underscore-dangle
        key: `${cur._id}_individual`,
        // eslint-disable-next-line no-underscore-dangle
        id: cur._id,
        period: cur.period,
        price: `${cur.price}$`,
      });
    } else {
      acc.global.push({
        // eslint-disable-next-line no-underscore-dangle
        key: `${cur._id}_global`,
        // eslint-disable-next-line no-underscore-dangle
        id: cur._id,
        period: cur.period,
        type: cur.type,
        price: `${cur.price}$`,
      });
    }

    return acc;
  }, { global: [], individual: [] }) : []), [subscription.results]);

  useEffect(() => {
    getSubscriptionPlan();
  }, [getSubscriptionPlan]);

  return (
    <>
      { isRoot && (
      <WrapperComponent
        originData={data()}
        createSubscriptionPlan={createSubscriptionPlan}
        updateSubscriptionPlan={updateSubscriptionPlan}
        deleteSubscriptionPlan={deleteSubscriptionPlan}
        updateSubscription={updateSubscription}
        subscription={subscription}
      />
      )}
    </>
  );
};

const mapStateToProps = (store) => ({
  roles: store.authStore.user.roles,
  subscription: store.subscriptionStore,
});

const mapDispatchToProps = (dispatch) => ({
  getSubscriptionPlan: () => dispatch(actions.getSubscriptionPlan()),
  updateSubscriptionPlan: (data) => dispatch(actions.updateSubscriptionPlan(data)),
  deleteSubscriptionPlan: (data) => dispatch(actions.deleteSubscriptionPlan(data)),
  createSubscriptionPlan: (data) => dispatch(actions.createSubscriptionPlan(data)),
  updateSubscription: (data) => dispatch(actions.updateSubscription(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionContainer);
