import { combineReducers } from 'redux-immutable';
import * as asyncInitialState from 'redux-async-initial-state';
import Immutable from 'immutable';
import CountyReducers from './CountyRecuder';
import OptionsReducers from './OptionsReducers';
import SwitchReducer from './SwitchReducer';
import TopoJsonReducer from './TopoJsonReducer';
import StatisticReducer from './StatisticReducer';
import { getCounDataM, getCounStatisticM } from '../actions/DataActions';

// const loadTopoJSON = COUNTYID => (
//   fetch(`assets/TopoJSON/COUN-${COUNTYID}.json`).then(response => (
//       response.json().then(value => ({
//         COUNTYID,
//         TOPOJSON: value,
//       }))
//   ))
// );

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
        });

        newState = newState
                          .setIn(['CountyReducers', 'CountyInfo', 'byId'], Immutable.fromJS(CountyInfo))
                          .setIn(['CountyReducers', 'CountyInfo', 'allIds'], Immutable.fromJS(CountyId));

        // ToDo 修改寫法？
        const Topo = getCounDataM('A').then((json) => {
          newState = newState.set('TopoJsonReducer', json);
        });

        const Statistic = getCounStatisticM('A').then((json) => {
          newState.get('StatisticReducer').data = json;
        });

        Promise.all([Topo, Statistic]).then(() => {
          resolve(newState);
        });


        // // TODO 抽掉這段
        // Promise.all(Promises).then((arr) => {
        //   arr.forEach((obj) => {
        //     newState = newState.mergeIn(['CountyReducers', 'CountyTopoJSON', 'byId'], Immutable.fromJS({ [obj.COUNTYID]: obj }))
        //                        .updateIn(['CountyReducers', 'CountyTopoJSON', 'allIds'], list => list.push(obj.COUNTYID));
        //   });
        // }).then(() => {
        //
        // });
      });
    });
  })
);

const Reducers = asyncInitialState.outerReducer(combineReducers({
  CountyReducers,
  OptionsReducers,
  SwitchReducer,
  TopoJsonReducer,
  StatisticReducer,
  asyncInitialState: asyncInitialState.innerReducer,
}));

export { loadStore, Reducers };
