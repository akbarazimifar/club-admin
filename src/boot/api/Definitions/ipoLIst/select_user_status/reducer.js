import {SELECT_USER_STATUS , SELECT_USER_STATUS_EMPTY} from '../../../typeActions'

const initState = {
  data: [],
};

export const select_user_status_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case SELECT_USER_STATUS:
      return { data: payload };
    case SELECT_USER_STATUS_EMPTY:
      return { data: [] };
      
    default:
      return state;
  }
};
