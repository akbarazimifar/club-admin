import { STOCK_V1_SELECT_SUMMARIES } from "../../typeActions";
import ApiConfig from "../../../../Containers/Common/Components/apiConfig";
import {
  handleNoAnswarApi,
  handleAlertMethodSelect,
} from "../../../../Containers/Common/method/handleAlertAndSelectApi";

export function summaries_v1_actions_select(data, sort_by) {
  return async (dispatch) => {
    let config = { url: "select_request" };

    let _data = {
      table: "stock",
      method_type: "select_summaries",
      from: 0,
      size: 10000,
      data: data ? data : {},
      sort_by: sort_by ? sort_by : {},
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

      let response = await ApiConfig(config, _data);
      let isOk = handleAlertMethodSelect(response.data, dispatch);
      if (!isOk) {
        return;
      }
      dispatch({
        type: STOCK_V1_SELECT_SUMMARIES,
        payload: response.data.response.data.results,
      });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
}
