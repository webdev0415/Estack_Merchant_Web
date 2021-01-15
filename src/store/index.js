import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from '../components/App';
import rootReducer from './reducers';

import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(sagas);

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
