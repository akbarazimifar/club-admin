
import ApiConfig from "../../../Containers/Common/Components/apiConfig";
import {
  CUSTOMERS_V1_SELECT,
  CUSTOMERS_V1_SELECT_LOADING,
} from "../typeActions";
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../Containers/Common/method/handleAlertAndSelectApi";

export const customer_v1_select_actions = (size, from, data, sort_by) => {
  return async (dispatch) => {
    let config = { url: "select_request" };

    let _data = {
      table: "brokercustomer",
      method_type: "select_broker_customers",

      from: from ? (from - 1) * size : 0,
      data: data ? data : {},
      size: 50,
      sort_by: sort_by,
    };

    dispatch({ type: CUSTOMERS_V1_SELECT_LOADING, payload: true });

    try {
      let res = await ApiConfig(config, _data);


      let isOk = handleAlertMethodSelect(res.data ,dispatch )
      if(!isOk){
              return 
      }

      if (!res.data.response.data.results) {
        dispatch({
          type: "ALERT",
          payload: {
            status: true,
            textAlert: "رکورد بیشتری وجود ندارد",
            typeAlert: "warning",
          },
        });
      }

      dispatch({
        type: CUSTOMERS_V1_SELECT,
        payload: res.data,
      });

      dispatch({ type: CUSTOMERS_V1_SELECT_LOADING, payload: false });
    } catch (err) {
      handleNoAnswarApi(dispatch);
      dispatch({ type: CUSTOMERS_V1_SELECT_LOADING, payload: false });
    }
  };
};
