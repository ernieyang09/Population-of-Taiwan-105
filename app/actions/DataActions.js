import { DataConstants } from '../constants/AppConstants';
import JSONModel from '../constants/Model/JSONModel';

const getCounDataM = (CounID) => {
  return new Promise((resolve) => {
    if (!Object.prototype.hasOwnProperty.call(JSONModel.byId, CounID)) {
      fetch(`assets/TopoJSON/COUN-${CounID}.json`).then(response => (
        response.json().then((TopoJSON) => {
          JSONModel.byId[CounID] = TopoJSON;
          resolve(TopoJSON);
        })
    ));
    } else {
      resolve(JSONModel.byId[CounID]);
    }
  });
}


export const getCounData = (payload: {COUNTYID:string}) => (
  (dispatch) => {
    getCounDataM(payload.COUNTYID).then((json) => {
      dispatch({
        type: DataConstants.GetData,
        json,
      });
    })
  }
);
