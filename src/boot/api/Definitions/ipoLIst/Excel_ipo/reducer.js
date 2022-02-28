import { SELECT_IPOLIST_EXCEL } from "../../../typeActions";

const initState = {
  data: [],
};

export const select_ipoList_excel_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case SELECT_IPOLIST_EXCEL:
      return { data: payload };
    default:
      return state;
  }
};
