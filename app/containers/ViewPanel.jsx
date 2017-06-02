import { connect } from 'react-redux';
import ViewPanel from '../components/ViewPanel';


const mapStateToProps = state => ({
  CurrentCoun: state.get('OptionsReducers'),
  TopoJson: state.get('JsonReducer'),
});


const mapDispatchToProps = dispatch => ({


});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewPanel);
