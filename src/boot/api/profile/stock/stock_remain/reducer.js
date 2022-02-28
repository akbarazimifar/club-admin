import { PRTFOLIO_REMAIN, PRTFOLIO_REMAIN_EMPTY } from "../../../typeActions";

const iniState = {
  data: [],
};

export const select_portfolio_remain_reducer = (
  state = iniState,
  { type, payload }
) => {
  switch (type) {
    case PRTFOLIO_REMAIN:
      return { data: payload };
    case PRTFOLIO_REMAIN_EMPTY:
      return iniState;
    default:
      return state;
  }
};
