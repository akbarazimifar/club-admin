import {
    BRANCHES_V1_SELECT
} from "../../typeActions";

import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi  , handleAlertMethodSelect} from "./../../../../Containers/Common/method/handleAlertAndSelectApi";




export function branches_v1_select_actions(size, from, sort_by) {
  return async (dispatch) => {
    // dispatch({ type: LOGIN_V1_loading });
    let config = { url: "select_request" };

    let _data = {
      table: "shoab",
      method_type: "select",
      from: from ? (from - 1) * size : 0,
      size: size,
      sort_by: sort_by,
      data: {},
    };
        try {
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

      dispatch({ type: BRANCHES_V1_SELECT, payload: response.data });

    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
}
