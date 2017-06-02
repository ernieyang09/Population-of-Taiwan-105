import { connect } from 'react-redux';
import ControlPanel from '../components/ControlPanel';
import { changeCoun } from '../actions/ControlActions';
import { getCounData } from '../actions/DataActions';

const mapStateToProps = state => ({
  CounInfos: state.getIn(['CountyReducers', 'CountyInfo', 'byId']),
  CounSelected: state.get('OptionsReducers'),
});


const mapDispatchToProps = dispatch => ({
  _changeCoun: (COUNID: string) => {
    dispatch(changeCoun({ COUNTYID: COUNID }));
    dispatch(getCounData({ COUNTYID: COUNID }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlPanel);
