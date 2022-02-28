
import ApiConfig from "../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";
import { STEPBYSTEP_DISCOUNT_SELECT } from "../../typeActions";

export const stepbystep_discount_action = (size, from, data) => {
  return async (dispatch) => {
    let config = { url: "select_request" };

    let _data = {
      table: "order",
      method_type: "select_bonus_requests",

      from: from ? (from - 1) * size : 0,
      data: data ? data : {},
      size: size ? size : 20,
    };

    try {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: "در حال بازخوانی",
          typeAlert: "info",
        },
      });
      let res = await ApiConfig(config, _data);

      let isOk = handleAlertMethodSelect(res.data ,dispatch )
      if(!isOk){
              return 
      }

      if (!res.data.response.data.results.length) {
        dispatch({
          type: "ALERT",
          payload: {
            status: true,
            textAlert: "تخفیف بیشتری وجود ندارد",
            typeAlert: "warning",
          },
        });
      }

      dispatch({
        type: STEPBYSTEP_DISCOUNT_SELECT,
        payload: res.data.response.data,
      });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
};
