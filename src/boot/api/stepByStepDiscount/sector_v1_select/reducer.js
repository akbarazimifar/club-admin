import { STEPBYSTEP_DISCOUNT_SELECT } from "../../typeActions";

const initState = {
  data: [],
  size: 20,
  total: 10000,
};

export const stepbystep_discount_Reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case STEPBYSTEP_DISCOUNT_SELECT:
      return {
        ...state,
        data: payload.results,
        total: payload?.total ? payload.total : 10000,
      };

    default:
      return state;
  }
};
