import {
    CONTACT_US_V1_SELECT_DETAILS,
    CONTACT_US_V1_SELECT_DETAILS_EMPTY,
  } from "../../../typeActions";
  
  const initState = {
    data: [],
    loading: true,
    size: 50,
    total: 200,
  };
  
  export const contactus_v1_select_details_reducer = (
    state = initState,
    { type, payload }
  ) => {
    switch (type) {
      case CONTACT_US_V1_SELECT_DETAILS:
        return { data: payload };
      case CONTACT_US_V1_SELECT_DETAILS_EMPTY:
        return initState;
      default:
        return state;
    }
  };