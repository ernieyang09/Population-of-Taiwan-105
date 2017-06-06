import React from 'react';
import PropTypes from 'prop-types';
import VisualView from '../containers/VisualView';
import DataView from '../containers/DataView';


const ViewPanel = () => (
  <div className="container-fluid">
    <div className="row">
      <VisualView />
      <DataView />
    </div>
  </div>
);

export default ViewPanel;
