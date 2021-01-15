import React from 'react';
import { connect } from 'react-redux';
import SetMembershipTiersCards from '../SetMembershipTiersCards';
import PointCurrency from '../PointCurrency';
import LoyaltyTiers from '../LoyaltyTiers';
import * as actions from '../../../store/actions';
import LoyaltyProgram from '../LoyaltyProgram';

function SetMembershipTiers(props) {
  const {
    isFetching,
    loyaltyProgram,
    pointCurrency,
    loyaltyTiers,
    updateLoyaltyProgram,
    updatePointCurrency,
  } = props;
  return (
    <div>
      <SetMembershipTiersCards />
      <LoyaltyProgram
        isFetching={isFetching}
        data={loyaltyProgram}
        onSubmit={updateLoyaltyProgram}
      />
      <PointCurrency
        isFetching={isFetching}
        data={pointCurrency}
        onSubmit={updatePointCurrency}
      />
      <LoyaltyTiers isFetching={isFetching} data={loyaltyTiers} />
    </div>
  );
}

const mapStateToProps = (store) => ({
  isFetching: store.businessStore.isFetching,
  loyaltyProgram: store.businessStore.loyaltyProgram,
  loyaltyTiers: store.businessStore.loyaltyTiers,
  pointCurrency: store.businessStore.pointCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (state) => dispatch(actions.signUp(state)),
  updateLoyaltyProgram: (state) => dispatch(actions.updateLoyaltyProgram(state)),
  updatePointCurrency: (state) => dispatch(actions.updatePointCurrency(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SetMembershipTiers);
