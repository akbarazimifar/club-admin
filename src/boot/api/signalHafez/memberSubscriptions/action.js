
import ApiConfig from "../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";
import { MEMBER_SUBSCRIPTION_V1_SELECT } from "../../typeActions";

export const member_subscriptions_v1_select_actions = (payload) => {
  return async (dispatch) => {
    let config = { url: "select_request" };

    let _data = {
      table: "HADAFHAFEZ",
      method_type: "select_member_subscriptions",
      from: payload.from ? (payload.from - 1) * payload.size : 0,
      data: payload.data ? payload.data : {},
      size: payload.size,
      sort_by: payload.sort_by,
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

      dispatch({
        type: MEMBER_SUBSCRIPTION_V1_SELECT,
        payload: res.data,
      });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
};
