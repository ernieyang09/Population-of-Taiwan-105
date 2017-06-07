import { DataConstants } from '../constants/AppConstants';
import JSONModel from '../constants/Model/JSONModel';

export const getCounDataM = CounID => (
  new Promise((resolve) => {
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
  })
);

export const getCounStatisticM = CounID => (
  new Promise((resolve) => {
    fetch(`assets/Statistic/COUN-${CounID}.json`).then(response => (
      response.json().then((Json) => {
        resolve(Json);
      })
    ));
  })
);


export const getCounData = (payload: {COUNTYID:string}) => (
  (dispatch) => {
    Promise.all([getCounDataM(payload.COUNTYID), getCounStatisticM(payload.COUNTYID)])
            .then(([mapJson, statisticJson]) => {
              dispatch({
                type: DataConstants.LoadCounJson,
                mapJson,
              });
              dispatch({
                type: DataConstants.LoadCounStatistic,
                statisticJson,
              });
            });
  }
);

export const getVillageInfo = props => ({
  type: DataConstants.GetVillageData,
  props,
});
