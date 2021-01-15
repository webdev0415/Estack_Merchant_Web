import { combineReducers } from 'redux';
import authStore from './authReducer';
import businessStore from './businessReducer';
import posesStore from './posesReducer';
import statsStore from './statsReducer';
import paymentStore from './payment';
import subscriptionStore from './subscriptionReducer';

const reducer = combineReducers({
  authStore,
  businessStore,
  posesStore,
  statsStore,
  paymentStore,
  subscriptionStore,
});

export default reducer;
