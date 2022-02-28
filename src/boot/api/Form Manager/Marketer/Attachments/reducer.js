import {
  MARKETER_SELECT_ATTACHMENTS,
  MARKETER_SELECT_ATTACHMENTS_EMPTY,
  } from "../../../typeActions";
  
  const initState = {
    data: [],
  };
  
  export const marketer_v1_select_attachments_reducer = (
    state = initState,
    { type, payload }
  ) => {
    switch (type) {
      case MARKETER_SELECT_ATTACHMENTS:
        return { data: payload };
      case MARKETER_SELECT_ATTACHMENTS_EMPTY:
        return initState;
      default:
        return state;
    }
  };
  