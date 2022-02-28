// import {
//     BRANCHES_V1_SELECT,
// } from "../../typeActions";
//
//
// const initState = {
//     data: ""
// }
//
//
// export const  branches_v1_select_Reducer = (state = initState, { type, payload }) => {
//
//     switch (type) {
//         case BRANCHES_V1_SELECT:
//             return { data: payload }
//         default:
//             return state;
//     }
// }
//
import { BRANCHES_V1_SELECT } from "../../typeActions";

const initState = {
  data: "",
  size: 20,
  total: 200,
};

export const branches_v1_select_Reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case BRANCHES_V1_SELECT:
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
