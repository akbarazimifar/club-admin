import ApiConfig from "../../../../../Containers/Common/Components/apiConfig/index";
import {
  handleNoAnswarApi,
  handleAlertAndSelectApi,
} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { contactus_v1_select_actions } from "./../action";

export function contactus_v1_update_actions(data, id) {
  return async (dispatch) => {
    let config = { url: "update_request" };

    let _data = {
      table: "contactus",
      method_type: "update",
      data: {
        response: data,
        _id: id,
      },
    };

    try {
      let res = await ApiConfig(config, _data);
      handleAlertAndSelectApi(res.data, contactus_v1_select_actions, dispatch);
      // if (res.data.status !== 200 || !res.data.response.is_successful) {
      //   handleNoAnswarApi(dispatch);
      //   return;
      // }
    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
}
