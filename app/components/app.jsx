import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ControlPanel from '../containers/ControlPanel';
import ViewPanel from '../components/ViewPanel';


const app = () => (
  <div>
    <ControlPanel />
    <ViewPanel />
  </div>
);


export default app;
