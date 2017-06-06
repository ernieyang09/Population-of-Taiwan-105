import { connect } from 'react-redux';
import DataView from '../components/DataView';

const getSingleData = (props , data) => {
  if(Object.keys(props).length === 0 ) {
    return [];
  } else {
    const villagecode = parseInt(props.VILLCODE);
    return data.filter(single => single.VillageCode === villagecode)[0];
  }
}

const mapStateToProps = state => {
  return {
    VillageInfo: state.get('StatisticReducer').props,
    VillageData: getSingleData(state.get('StatisticReducer').props, state.get('StatisticReducer').data),
  }
};


const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataView);
