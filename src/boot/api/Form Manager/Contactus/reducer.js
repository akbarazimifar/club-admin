import {
  CONTACT_US_V1_SELECT,
  CONTACT_US_V1_SELECT_LOADING,
} from "../../typeActions";

const initState = {
  data: [],
  loading: false,
  size: 50,
  total: 200,
};

export const contactus_select_reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case CONTACT_US_V1_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total,
      };
    case CONTACT_US_V1_SELECT_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
