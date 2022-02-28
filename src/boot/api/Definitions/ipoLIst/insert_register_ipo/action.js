import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import {handleAlertAndSelectApi} from './../../../../../Containers/Common/method/handleAlertAndSelectApi';
import {ipoList_select_action} from './../action';



export function ipo_insert_action(data , id) {
  return async (dispatch) => {
    let config = { url: "insert_request" };

    let _data = {
      table: "ipo",
      method_type: "register_ipo",
      data: data ? data : {}
    };

    try {
      let response = await ApiConfig(config, _data);
      handleAlertAndSelectApi(response.data, ipoList_select_action, dispatch , id)

    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
}
