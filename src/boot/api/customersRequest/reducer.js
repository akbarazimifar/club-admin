import {
  CUSTOMERS_V1_SELECT,
  CUSTOMERS_V1_SELECT_LOADING,
} from "../typeActions";

const initState = {
  data: [],
  loading: false,
  size: 50,
  total: 200,
};

export const customer_select_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case CUSTOMERS_V1_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total,
      };
    case CUSTOMERS_V1_SELECT_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
