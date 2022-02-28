import {
  handleAlertAndSelectApi,
  handleNoAnswarApi,
} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { ipoList_select_title_action } from "../select_ipos/action";
// import {SELECT_IPO_LIST_TITLE} from '../../../typeActions'

import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";

export function insert_newIpo(data) {

  return async (dispatch) => {
    let config = { url: "insert_request" };
    let _data = {
      table: "ipo",
      method_type: "insert_ipo",
      data: {
        ...data,
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
