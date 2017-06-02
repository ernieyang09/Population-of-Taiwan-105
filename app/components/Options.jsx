import React from 'react';
import PropTypes from 'prop-types';


const Options = ({
  CounInfos,
  changeCoun,
  selected,
}) => {

  return (
    <select onChange={function (e) { changeCoun(e.target.value); }} value={selected} >
      {
        CounInfos.valueSeq().map((CounInfo) => (
          <option key={CounInfo.get('COUNTYID')} value={CounInfo.get('COUNTYID')}>{CounInfo.get('COUNTYNAME')}</option>
        ))
      }
    </select>
  );
};

export default Options;
