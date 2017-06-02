import React from 'react';
import PropTypes from 'prop-types';
import VisualView from '../components/VisualView';
import DataView from '../components/DataView';


// const getCounData = (CounID) => {
//   return new Promise((resolve) => {
//     if (!Object.prototype.hasOwnProperty.call(JSONModel.byId, CounID)) {
//       fetch(`assets/TopoJSON/COUN-${CounID}.json`).then(response => (
//           response.json().then((TopoJSON) => {
//             JSONModel.byId[CounID] = TopoJSON;
//             resolve(TopoJSON)
//           })
//       ));
//     } else {
//       resolve(JSONModel.byId[CounID]);
//     }
//   })
//
//
// }
// getCounData(CurrentCoun).then((TopoJSON) => {
//   console.log(test)
// });

const ViewPanel = ({
  CurrentCoun,
  TopoJson,
  ...props
}) => {

  return (
    <div className="container-fluid">
      <div className="row">
        <VisualView TopoJson={TopoJson} />
        <DataView />
      </div>
    </div>
  )
};

export default ViewPanel;
