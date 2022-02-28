import { BONUS_V1_SELECT_SELECT_CONFIICT, BONUS_V1_SELECT_SELECT_CONFIICT_LOADING } from '../../../typeActions'

const initState = {
  data: [],
  total : 10000,
  size:50,
  loading:false
};

export const bonus_select_confiict_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case BONUS_V1_SELECT_SELECT_CONFIICT:
      return { 
        ...state,
        data: payload.results,
        total : payload.total,
       };
    case BONUS_V1_SELECT_SELECT_CONFIICT_LOADING:
      return { 
        ...state,
        loading: payload,
     
       };

    default:
      return state;
  }
};
