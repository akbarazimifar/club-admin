import { SELECT_IPO_LIST } from "../../typeActions";
import { SELECT_IPO_LIST_EMPTY } from "../../typeActions"

const initState = {
  data: [],
  size : 50 ,
  total : 10000
};

export const select_ipo_list_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case SELECT_IPO_LIST:
      return {...state ,  data: payload.results, total : payload?.total ? payload.total : 10000
      };

    case SELECT_IPO_LIST_EMPTY:
      return initState;
    default:
      return state;
  }
};
