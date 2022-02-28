import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { SELECT_STOCK_DETAILS } from "../../../typeActions";

export const select_stock_details = (arrayIsin) => {
  let obj = {};
  return async (dispatch) => {
    for (let index = 0; index < arrayIsin.length; index++) {
      let config = { url: "select_request" };

      let _data = {
        table: "stock",
        method_type: "select_stock_details",

        data: { isin: arrayIsin[index] },
      };

      try {
        let res = await ApiConfig(config, _data);

        let isOk = handleAlertMethodSelect(res.data, dispatch)
        if (!isOk) {
            return
        }     

        obj[arrayIsin[index]] = res.data.response.data.results[0]?.body?.last_price;

      } catch (err) {

        console.log("catch select_stock_details",err);
        handleNoAnswarApi(dispatch);
      }
      
      
    }
    dispatch({
      type: SELECT_STOCK_DETAILS,
      payload: obj,
    });
  };
};
