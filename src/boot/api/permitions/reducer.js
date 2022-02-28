import { CLUB_MEMBER_SELECT_DATA,CLUB_MEMBER_SELECT_RESET} from "../typeActions";

const initState = {
  data: [],
  data2:[],
};

export const clubmember_select_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case CLUB_MEMBER_SELECT_DATA:
      return { data:payload };
    case CLUB_MEMBER_SELECT_RESET:
      return initState;
      
    // case CLUB_MEMBER_SELECT_DATA2:
    //   return { data2: [...state.data2, ...payload], from:0};
    default:
      return state;
  }
};