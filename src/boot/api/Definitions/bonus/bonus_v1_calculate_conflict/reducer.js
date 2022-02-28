import {
  BONUS_V1_SELECT_CALCULATE_CONFIICT,
  BONUS_V1_SELECT_CALCULATE_CONFIICT_EMPTY,
  BONUS_V1_SELECT_CALCULATE_CONFIICT_LOADING
} from '../../../typeActions'

const initState = {
  data: [],
  loading: false
};

export const bonus_calculate_confiict_reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case BONUS_V1_SELECT_CALCULATE_CONFIICT:
      return {
        ...state,
        data: payload,
      };
    case BONUS_V1_SELECT_CALCULATE_CONFIICT_EMPTY:
      return {
        ...state,
        data: []
      };
    case BONUS_V1_SELECT_CALCULATE_CONFIICT_LOADING:
      return {
        ...state,
        loading: payload
      };

    default:
      return state;
  }
};
