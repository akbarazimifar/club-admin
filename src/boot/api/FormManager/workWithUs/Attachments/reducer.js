import {
    WORK_WITH_US_V1_SELECT_ATTACHMENTS,
    WORK_WITH_US_V1_SELECT_ATTACHMENTS_EMPTY,
  } from "../../../typeActions";
  
  const initState = {
    data: [],
  };
  
  export const workwithus_v1_select_attachments_reducer = (
    state = initState,
    { type, payload }
  ) => {
    switch (type) {
      case WORK_WITH_US_V1_SELECT_ATTACHMENTS:
        return { data: payload };
      case WORK_WITH_US_V1_SELECT_ATTACHMENTS_EMPTY:
        return initState;
      default:
        return state;
    }
  };
  