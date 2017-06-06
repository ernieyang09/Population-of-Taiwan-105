const StatisticReducer = (state = { props: {}, data: [] }, action) => {
  switch (action.type) {
    case 'LoadCounStatistic': {
      return {
        props: {},
        data: action.statisticJson,
      };
    }
    case 'GetVillageData': {
      return {
        ...state,
        props: action.props,
      };
    }
    default:
      return state;
  }
};

export default StatisticReducer;
