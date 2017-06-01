/* eslint no-underscore-dangle: "off"*/

import * as d3 from 'd3';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import * as asyncInitialState from 'redux-async-initial-state';
import Reducers from './reducers/index';
import App from './components/app';


require('./assets/main.css');
require('flexboxgrid');


const loadTopoJSON = COUNTYID => (
  fetch(`assets/TopoJSON/COUN-${COUNTYID}.json`).then(response => (
      response.json().then(value => ({
        COUNTYID,
        TOPOJSON: value,
      }))
  ))
);

const loadStore = currentState => (
  new Promise((resolve) => {
    fetch('http://localhost:3004/loadInitData').then((response) => {
      response.json().then((info) => {
        const CountyInfo = {};
        const CountyId = [];
        const Promises = [];
        let newState = currentState;
        Object.entries(info).forEach(([key, value]) => {
          CountyInfo[key] = {
            COUNTYID: key,
            COUNTYNAME: value,
          };
          CountyId.push(key);
          Promises.push(loadTopoJSON(key));
        });
        Promise.all(Promises).then((arr) => {
          arr.forEach((obj) => {
            newState = newState.mergeIn(['CountyReducers', 'CountyTopoJSON', 'byId'], { [obj.COUNTYID]: obj })
                               .updateIn(['CountyReducers', 'CountyTopoJSON', 'allIds'], list => list.push(obj.COUNTYID));
          });
        }).then(() => {
          newState = newState
                            .setIn(['CountyReducers', 'CountyInfo', 'byId'], CountyInfo)
                            .setIn(['CountyReducers', 'CountyInfo', 'allIds'], CountyId);
          resolve(newState);
        });
      });
    });
  })
);

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
