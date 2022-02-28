import { PERSON_V1_SELECT_INTEGRATE_PROFILES, PERSON_V1_SELECT_INTEGRATE_PROFILES_EMPTY } from "../../../typeActions";

const initState = {
  data: [],
  national_id: "",
};

export const person_v1_select_Integrate_profiles_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case PERSON_V1_SELECT_INTEGRATE_PROFILES:
      return {
        data: payload.data.response.data.results,
        national_id: payload.national_id,
      };
    case PERSON_V1_SELECT_INTEGRATE_PROFILES_EMPTY:
      return {
        data:[],
        national_id: "",
      };

    default:
      return state;
  }
};

// import { PERSON_V1_SELECT_INTEGRATE_PROFILES } from "../../../typeActions";
//
// const initState = {
//   data: [],
//   national_id: "",
//   size: 20,
//   total: 100,
// };
//
// export const person_v1_select_Integrate_profiles_reducer = (
//   state = initState,
//   { type, payload }
// ) => {
//   switch (type) {
//     case PERSON_V1_SELECT_INTEGRATE_PROFILES:
//       return {
//         ...state,
//         data: payload.data.response.data.results,
//         total: 10000,
//         national_id: payload.national_id,
//       };
//
//     default:
//       return state;
//   }
// };
