
import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { GIFTCASH_V1_SELECT } from "../../../typeActions";

export const giftCash_v1_select_actions = (size, from, data, sort_by) => {
  return async (dispatch) => {
    let config = { url: "select_request" };

    let _data = {
      table: "onlinecharge",
      method_type: "select_registrations",
      from: from ? (from - 1) * size : 0,
      data: data ? data : {},
      size: size,
      sort_by: sort_by,
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
      let isOk = handleAlertMethodSelect(res.data, dispatch)
      if (!isOk) {
        return
      }

      if (!res.data.response.data.results.length) {
        dispatch({
          type: "ALERT",
          payload: {
            status: true,
            textAlert: "اعلان بیشتری وجود ندارد",
            typeAlert: "warning",
          },
        });
      }

      dispatch({
        type: GIFTCASH_V1_SELECT,
        payload: res.data,
      });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
};
