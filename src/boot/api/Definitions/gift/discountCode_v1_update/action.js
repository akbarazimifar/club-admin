import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import {
  handleAlertAndSelectApi,
  handleAlertMethodSelect,
  handleNoAnswarApi,
} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import {
  DISCOUNT_CODE_EXCEL_SELECT,
  USERS_V1_SELECT,
} from "../../../typeActions";
import { discountCode_v1_select_actions } from "../discountCode_v1_select/action";

export const discountCode_v1_update_action = (data) => {
  return async (dispatch) => {
    let config = { url: "update_request" };

    let _data = {
      table: "discountcode",
      method_type: "update_discount_code",

      data: data ? data : {},
    };

    try {
      let response = await ApiConfig(config, _data);

      handleAlertAndSelectApi(
        response.data,
        discountCode_v1_select_actions,
        dispatch
      );
    } catch (err) {

      handleNoAnswarApi(dispatch);
    }
  };
};
