import {
  CUSTOMER_V1_SELECT_ATTACHMENTS,
  CUSTOMER_V1_SELECT_EMPTY,
} from "../../typeActions";

const initState = {
  data: [],
};

export const customer_v1_select_attachments_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case CUSTOMER_V1_SELECT_ATTACHMENTS:
      return { data: payload };
    case CUSTOMER_V1_SELECT_EMPTY:
      return initState;
    default:
      return state;
  }
};
