import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import './index.scss';

import { loadConfig } from './store/actions/'
import App from './App';
import languageReducer from './store/reducers/language';
import dictionaryReducer from './store/reducers/dictionary';
import * as sagas from './store/sagas/';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = 
  (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) 
  || compose;

const rootReducer = combineReducers({
  language: languageReducer,
  dictionary: dictionaryReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

Object.keys(sagas)
  .forEach(watcher => sagaMiddleware.run(sagas[watcher]));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

store.dispatch(loadConfig());

ReactDOM.render(
  app, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
