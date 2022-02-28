import { SIGANL_V1_SELECT } from "../../typeActions";

const initState = {
  data: "",
  size: 20,
  total: 200,
};

export const signal_hafez_v1_select_Reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case SIGANL_V1_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total ? payload.response.data.total : 200,
      };
    default:
      return state;
  }
};
