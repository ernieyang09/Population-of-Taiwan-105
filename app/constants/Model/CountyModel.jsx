import Immutable from 'immutable';


const CountyInitState = Immutable.fromJS({
  CountyInfo: {
    byId: {
    },
    allIds: [],
  },
  CountyTopoJSON: {
    byId: {
    },
    allIds: [],
  },
});


export default CountyInitState;
