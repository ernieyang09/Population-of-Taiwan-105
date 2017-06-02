import { DataConstants } from '../constants/AppConstants';

const JsonReducer = (state = {}, action) => {
  console.log(action)
  switch (action.type) {
    case DataConstants.GetData: {
      return action.json;
    }
    default:
      return state;
  }
};

export default JsonReducer;
