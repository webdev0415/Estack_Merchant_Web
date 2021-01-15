import { createAction, createReducer } from 'redux-act';
import * as _ from 'lodash';

const initialState = {
  cards: [],
  isFetching: true,
};

const reducer = createReducer({}, initialState);

export const setCardList = createAction('SET_CARD_LIST', (payload) => payload);
reducer.on(setCardList, (state, { data: cards, has_more: hasMore }) => ({
  ...state,
  cards,
  hasMore,
}));

export const setPaymentFetchingStatus = createAction('SET_PAYMENT_FETCHING_STATUS',
  (payload) => payload);
reducer.on(setPaymentFetchingStatus, (state, {
  isFetching,
}) => ({
  ...state,
  isFetching,
}));

export const setCard = createAction('SET_CARD', (payload) => payload);
reducer.on(setCard, (state, card) => ({
  ...state,
  cards: [card, ...state.cards],
}));

export const deleteCard = createAction('DELETE_CARD', (payload) => payload);
reducer.on(deleteCard, (state, card) => ({
  ...state,
  cards: _.filter(state.cards, (x) => x.id !== card.id),
}));

export default reducer;
