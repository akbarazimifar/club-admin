import {
    WORK_WITH_US_V1_UPDATE
  } from "../../../typeActions";
  
  const initState = {
    data: [],
  };
  
  export const workwithus_v1_update_reducer = (
    state = initState,
    { type, payload }
  ) => {
    switch (type) {
      case WORK_WITH_US_V1_UPDATE:
        return { data: payload };
      default:
        return state;
    }
  };