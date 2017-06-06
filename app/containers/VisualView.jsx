import { connect } from 'react-redux';
import VisualView from '../components/VisualView';
import { getVillageInfo } from '../actions/DataActions';

const mapStateToProps = state => ({
  TopoJson: state.get('TopoJsonReducer'),
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
