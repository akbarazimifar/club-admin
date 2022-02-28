import {LOG_IN_LIST_SELECT } from "../typeActions";

const initState = {
  data: "",
  size: 20,
  total: 1000,
};

export const logInList_select_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case LOG_IN_LIST_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total
        ? payload.response.data.total > 10000
            ? 10000
            : payload.response.data.total
        : 10000
      };

    default:
      return state;
  }
};
