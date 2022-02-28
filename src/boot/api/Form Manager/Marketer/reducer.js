import {
  MARKETER_V1_SELECT,
  MARKETER_V1_SELECT_LOADING,
} from "../../typeActions";

const initState = {
  data: [],
  loading: false,
  size: 50,
  total: 200,
};

export const marketer_select = (state = initState, { type, payload }) => {
  switch (type) {
    case MARKETER_V1_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total,
      };
    case MARKETER_V1_SELECT_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
