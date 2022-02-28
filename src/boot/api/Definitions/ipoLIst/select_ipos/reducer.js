import {SELECT_IPO_LIST_TITLE} from '../../../typeActions'

const initState = {
  data: [],
};

export const select_ipo_list_title_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case SELECT_IPO_LIST_TITLE:
      return { data: payload };
    default:
      return state;
  }
};
