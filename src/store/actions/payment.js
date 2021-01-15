import { createAction } from 'redux-act';

export const getCardList = createAction('GET_CARD_LIST');
export const addCard = createAction('ADD_CARD', (payload) => payload);
export const submitPayment = createAction('SUBMIT_PAYMENT', (payload) => payload);
export const deletePayment = createAction('DELETE_PAYMENT', (payload) => payload);
