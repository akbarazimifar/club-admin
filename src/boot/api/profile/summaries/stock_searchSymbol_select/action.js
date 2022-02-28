import { STOCK_V1_SELECT_SEARCHSYMBOL } from "../../../typeActions";
import ApiConfig from "../../../../../Containers/Common/Components/apiConfig/index";
import {
  handleNoAnswarApi,
  handleAlertMethodSelect,
} from "../../../../../Containers/Common/method/handleAlertAndSelectApi/index";

export function stock_searchsymbol_select_action(data) {
  return async (dispatch) => {
    let config = { url: "select_request" };

    let _data = {
      table: "stock",
      method_type: "select_summaries",
      from: 0,
      size: 500,
      data: data ? data : {},
    };

    try {
      // dispatch({
      //   type: "ALERT",
      //   payload: {
      //     status: true,
      //     textAlert: "در حال بازخوانی",
      //     typeAlert: "info",
      //   },
      // });

      let response = await ApiConfig(config, _data);
      let isOk = handleAlertMethodSelect(response.data, dispatch);
      if (!isOk) {
        return;
      }
      dispatch({
        type: STOCK_V1_SELECT_SEARCHSYMBOL,
        payload: response.data.response.data.results,
      });
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
}
