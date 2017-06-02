import { ControlConstants } from '../constants/AppConstants';

export const changeCoun = (payload: {COUNTYID:string}) => ({
  type: ControlConstants.ChangeCoun,
  COUNID: payload.COUNTYID,
});

export const test = (payload: {text:string}) => ({

});
