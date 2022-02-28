import ApiConfig from "../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi } from "../../../../Containers/Common/method/handleAlertAndSelectApi";
import { CUSTOMER_V1_SELECT_ATTACHMENTS } from "../../typeActions";



export const customer_v1_select_attachments_actions = (data) => {
    return async (dispatch) => {
      let config = { url: "select_request" };
  
      let _data = {
        table: "brokercustomer",
        method_type: "select_broker_customers",
  
        data: {"_id": data},
      };
       
      try {
        let res = await ApiConfig(config, _data);
  
        if (res.data.status !== 200 || !res.data.response.is_successful) {
          handleNoAnswarApi(dispatch);
          return;
        }
        dispatch({
            type: CUSTOMER_V1_SELECT_ATTACHMENTS,
            payload: res.data.response.data.results,
        });
      } catch (err) {
        handleNoAnswarApi(dispatch);
      }
    };
  };

