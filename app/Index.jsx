/* eslint no-underscore-dangle: "off"*/

import * as d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as asyncInitialState from 'redux-async-initial-state';
import { loadStore, Reducers } from './reducers/index';
import App from './components/app';


require('./assets/main.css');
require('flexboxgrid');


const store = createStore(Reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(thunk),
            applyMiddleware(asyncInitialState.middleware(loadStore))),
);
window.a = store;


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('Root'),
);
