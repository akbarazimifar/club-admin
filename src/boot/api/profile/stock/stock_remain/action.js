import  ApiConfig  from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { PRTFOLIO_REMAIN } from "../../../typeActions";

export const select_member_remain = (member_id) => {
  return async (dispatch) => {

    // console.log("member_id", member_id)

    let config = { url: "select_request" };

    let _data = {
      table: "portfolio",
      method_type: "select_portfolio_remain",

      data: {"member_id": member_id},
    };

    try {
        let response = await ApiConfig(config, _data)
        // dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })
        
        if (response.data.status !== 200) {
            handleNoAnswarApi(dispatch)
            return
        }
        
        dispatch({ type: PRTFOLIO_REMAIN, payload: response.data })
    }
    catch (err) {
      alert("catch select_portfolio_remain",err)

        handleNoAnswarApi(dispatch)
    }

}
}