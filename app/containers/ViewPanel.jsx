import { connect } from 'react-redux';
import ViewPanel from '../components/ViewPanel';
import { getVillageInfo } from '../actions/DataActions';


const mapStateToProps = state => ({
  CurrentCoun: state.get('OptionsReducers'),
  TopoJson: state.get('TopoJsonReducer'),
  // CurrentVillage: state.get('StatisticReducer').currentVillageID,
  // VillageInfo: state.get('StatisticReducer').props,
});


const mapDispatchToProps = dispatch => ({
  _getVillageInfo: (props) => {
    dispatch(getVillageInfo(props));
  },

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewPanel);
