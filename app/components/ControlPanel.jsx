import React from 'react';
import PropTypes from 'prop-types';
import Options from './Options';
import SwitchButton from './SwitchButton';

const ControlPanel = ({
  _changeCoun,
  CounInfos,
  CounSelected,
}) => {
  return(
    <div>
      <div style={{ margin: '10px' }}><SwitchButton /></div>
      <div style={{ margin: '10px' }}><Options CounInfos={CounInfos} selected={CounSelected} changeCoun={_changeCoun} /></div>
    </div>
  )
};

export default ControlPanel;
