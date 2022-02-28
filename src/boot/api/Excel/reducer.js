import {
    EXCEL_GET_DATA,
    EXCEL_GET_DATA2,
    EXCEL_GET_EMPTY,
    EXCEL_GET_LOADING,
    EXCEL_GET_ISOK
  } from "../typeActions";
  
  const initState = {
    data: [],
    data2: [],
    loading: false,
    isOk: false,
  };
  
  export const excel_list_all_reducer = (
    state = initState,
    { type, payload }
  ) => {
    switch (type) {
      case EXCEL_GET_DATA:
        return {
          ...state,
          data: [...state.data, ...payload],
          data2: [],
        };
      case EXCEL_GET_DATA2:
        return {
          ...state,
          data: [],
          data2: [...state.data2, ...payload],
        };
      case EXCEL_GET_LOADING:
        return {
          ...state,
          loading: payload,
        };
      case EXCEL_GET_ISOK:
        return {
          ...state,
          isOk: payload,
        };
      case EXCEL_GET_EMPTY:
        return {
          ...initState
        };
      default:
        return state;
    }
  };
  