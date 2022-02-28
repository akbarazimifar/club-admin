import {
  REGISTRATION_COURSE_V1_SELECT,
  REGISTRATION_COURSE_V1_SELECT_MORE,
  REGISTRATION_COURSE_V1_LIST,
} from "../../../typeActions";

const initState = {
  data: [],
  data2: [],
  size: 20,
  total: 10000,
};

export const registeration_v1_select_Reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case REGISTRATION_COURSE_V1_SELECT:
      return {
        ...state,
        data: payload.results,
        total: payload.total ? payload.total : state.total,
      };
    case REGISTRATION_COURSE_V1_LIST:
      return {
        ...state,
        data2: payload,
        total: payload.total ? payload.total : state.total,
      };
    // case REGISTRATION_COURSE_V1_SELECT_MORE:
    //     if (payload.length === 0) {
    //         alert("دیتا جدیدی وجود ندارد.")
    //         return state
    //     }

    // return {
    //     data: [...state.data, ...payload],
    //     from: state.from + 20
    // }
    default:
      return state;
  }
};
