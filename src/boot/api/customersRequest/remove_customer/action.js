
import ApiConfig from "../../../../Containers/Common/Components/apiConfig";

import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";

export const customer_v1_remove_actions = ( data) => {
  return async (dispatch) => {
    let config = { url: "update_request" };

    let _data = {
      table: "brokercustomer",
      method_type: "cancel_broker_customer_request_by_id",
      data: data ? data : {},
   
    };



    try {
      let res = await ApiConfig(config, _data);

      let isOk = handleAlertMethodSelect(res.data ,dispatch )
      if(!isOk){
              return 
      }


    } catch (err) {
      handleNoAnswarApi(dispatch);
    }
  };
};
