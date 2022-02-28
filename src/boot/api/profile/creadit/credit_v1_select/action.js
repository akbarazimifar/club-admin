import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { CREADIT_PROFILE_V1_SELECT } from "../../../typeActions";
import { handleNoAnswarApi  , handleAlertMethodSelect} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export const creadit_v1_action_select = (data) => {
    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "credit",
            method_type: "select",
            data: data
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            dispatch({ type: CREADIT_PROFILE_V1_SELECT, payload: response.data })
        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
}