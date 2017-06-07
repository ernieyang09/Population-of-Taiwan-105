import { connect } from 'react-redux';
import VisualView from '../components/VisualView';
import { getVillageInfo } from '../actions/DataActions';

const mapStateToProps = state => ({
  Loading: state.get('asyncInitialState').loaded,
  TopoJson: state.get('TopoJsonReducer'),
  VillageData: state.get('StatisticReducer').data,
});


const mapDispatchToProps = dispatch => ({
  _getVillageInfo: (props) => {
    dispatch(getVillageInfo(props));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisualView);
