import { USERS_V1_SELECT } from "../../typeActions";

const initState = {
  data: "",
  size: 100,
  total: 200,
};

export const usersList_v1_list_Reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case USERS_V1_SELECT:
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
