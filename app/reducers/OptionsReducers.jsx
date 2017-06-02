import { ControlConstants } from '../constants/AppConstants';

const OptionsReducers = (state = 'A', action) => {
  switch (action.type) {
    case ControlConstants.ChangeCoun: {
      return action.COUNID;
    }
    default:
      return state;
  }
};

export default OptionsReducers;
