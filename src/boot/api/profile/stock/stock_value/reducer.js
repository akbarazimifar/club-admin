import {
  SELECT_STOCK_DETAILS,
  SELECT_STOCK_DETAILS_EMPTY,
} from "../../../typeActions";

const iniState = {
  data: [],
};

export const select_stock_details_reducer = (
  state = iniState,
  { type, payload }
) => {
  switch (type) {
    case SELECT_STOCK_DETAILS:
      return { data: payload };
    case SELECT_STOCK_DETAILS_EMPTY:
      return iniState;
    default:
      return state;
  }
};
