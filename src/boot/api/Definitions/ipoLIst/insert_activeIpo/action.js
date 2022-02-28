import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import {
  handleAlertAndSelectApi,
  handleNoAnswarApi,
} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { ipoList_select_title_action } from "../select_ipos/action";

export function Insert_activeIpo(data, method) {
  return async (dispatch) => {
    let config = { url: "update_request" };
    let _data = {
      table: "ipo",
      method_type: method,
      data: {
        _id: data,
      },
    };

    try {
      let response = await ApiConfig(config, _data);

      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: "در حال بازخوانی",
          typeAlert: "info",
        },
      });
      handleAlertAndSelectApi(
        response.data,
        ipoList_select_title_action,
        dispatch
      );
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
}
