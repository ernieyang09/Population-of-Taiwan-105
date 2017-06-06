import { DataConstants } from '../constants/AppConstants';

const TopoJsonReducer = (state = {}, action) => {
  switch (action.type) {
    case DataConstants.LoadCounJson: {
      return action.mapJson;
    }
    default:
      return state;
  }
};

export default TopoJsonReducer;
