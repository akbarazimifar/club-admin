import {
  WORK_WITH_US_V1_SELECT,
  WORK_WITH_US_V1_SELECT_LOADING,
} from "../../typeActions";

const initState = {
  data: [],
  loading: false,
  size: 50,
  total: 200,
};

export const work_with_us_select = (state = initState, { type, payload }) => {
  switch (type) {
    case WORK_WITH_US_V1_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total,
      };
    case WORK_WITH_US_V1_SELECT_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
