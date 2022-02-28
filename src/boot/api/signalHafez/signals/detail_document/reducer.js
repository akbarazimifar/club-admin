import { SIGANL_V1_DOCUMENT_SELECT, SIGANL_V1_DOCUMENT_SELECT_EMPTY, SIGANL_V1_DOCUMENT_SELECT_LOADING } from "../../../typeActions";

const initState = {
  data: "",
  loading: false
};

export const signal_document_hafez_v1_select_Reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case SIGANL_V1_DOCUMENT_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
      };
    case SIGANL_V1_DOCUMENT_SELECT_LOADING:
      return {
        ...state,
        loading: payload
      }
    case SIGANL_V1_DOCUMENT_SELECT_EMPTY:
      return initState
    default:
      return state;
  }
};
