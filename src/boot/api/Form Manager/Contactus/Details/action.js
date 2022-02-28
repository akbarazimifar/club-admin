import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleAlertMethodSelect, handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import {
    CONTACT_US_V1_SELECT_DETAILS
  } from "../../../typeActions";

export const contactus_v1_select_details_actions = (data) => {

    return async (dispatch) => {
      let config = { url: "select_request" };
  
      let _data = {
        table: "contactus",
        method_type: "select",
  
        data: {"_id": data},
      };
  
      try {
        let res = await ApiConfig(config, _data);
  
        if (res.data.status !== 200 || !res.data.response.is_successful) {
          handleNoAnswarApi(dispatch);
          return;
        }
        dispatch({
            type: CONTACT_US_V1_SELECT_DETAILS,
            payload: res.data.response.data.results,
        });
      } catch (err) {
        handleNoAnswarApi(dispatch);
      }
      
    };
  };