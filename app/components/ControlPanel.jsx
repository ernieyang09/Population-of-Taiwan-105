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
      <div><SwitchButton /></div>
      <Options CounInfos={CounInfos} selected={CounSelected} changeCoun={_changeCoun} />
    </div>
  )
};

export default ControlPanel;
