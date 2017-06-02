import { combineReducers } from 'redux-immutable';
import * as asyncInitialState from 'redux-async-initial-state';
import CountyReducers from './CountyRecuder';
import OptionsReducers from './OptionsReducers';
import SwitchReducer from './SwitchReducer';
import JsonReducer from './JsonReducer';

const Reducers = asyncInitialState.outerReducer(combineReducers({
  CountyReducers,
  OptionsReducers,
  SwitchReducer,
  JsonReducer,
  asyncInitialState: asyncInitialState.innerReducer,
}));

export default Reducers;
