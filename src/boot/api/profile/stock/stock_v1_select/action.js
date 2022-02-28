import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { STCOK_V1_SELECT } from "../../../typeActions";
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export const stock_v1_action_select = (data) => {
    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table:"portfolio",
            method_type: "select_portfolio_daily",
            data: data
        }

        try {
            let response = await ApiConfig(config, _data)
            // dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }        
            
            dispatch({ type: STCOK_V1_SELECT, payload: response.data })
        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
}