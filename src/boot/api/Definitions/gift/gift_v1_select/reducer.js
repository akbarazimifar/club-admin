import { GIFT_V1_SELECT, GIFT_V1_EMPTY } from "../../../typeActions";

const initState = {
  data: [],
  size: 20,
  total: 200,
};

export const gift_v1_select_Reducer = (
  state = initState,
  { type, payload }
) => {
  switch (type) {
    case GIFT_V1_SELECT:
      return {
        ...state,
        data: payload.response.data.results,
        total: payload.response.data.total
          ? payload.response.data.total
          : 10000,
      };
    // case GIFT_V1_SELECT_MORE:
    //     return {
    //         data: [
    //             ...state.data,
    //             ...payload.response.data.results
    //         ],
    //     }
    case GIFT_V1_EMPTY:
      return initState;
    default:
      return state;
  }
};

export const typeGift = [
  { name: "بیمه سامان", value: "BIMEH_SAMAN" },
  { name: "تحلیل", value: "TAHLIL" },
  { name: "آپ", value: "UP" },
  { name: "دیجی کالا", value: "DG" },
  { name: "کد تخفیف", value: "OFF_CODE" },
  { name: "تحویل فیزیکی", value: "PHYSICAL" },
  { name: "عمومی", value: "NO_TYPE" },
  { name: "شارژ آنلاین", value: "ONLINE_CHARGE" },
];
