import { SELECT_IPO_LIST } from "../../typeActions";

import ApiConfig from "../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";

export function ipoList_select_action(sort, size, id, from, data) {
  return async (dispatch) => {
    let config = { url: "select_request" };
    

    // let res = data ? { ...data } : { ipo_id: id }
    let _data = {
      table: "ipo",
      method_type: "select_registered_ipos",
      from: from ? (from - 1) * size : 0,
      size: size,
      data: {
        ipo_id : id ,
        ...data
      } ,
      sort_by : sort
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
      let isOk = handleAlertMethodSelect(response.data, dispatch)
      if (!isOk) {
          return
      }     
      
      dispatch({
        type: SELECT_IPO_LIST,
        payload: response.data.response.data,
      });

    } catch (err) {
      alert(err)
      handleNoAnswarApi(dispatch);
    }
  };
}
