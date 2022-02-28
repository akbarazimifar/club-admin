import {
    PERFORMANCE_SELECT_BY_ID
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function performance_v1_actions_select_by_id(data) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "competition",
            method_type: "select_performance_by_id",
            data: data
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            dispatch({ type: PERFORMANCE_SELECT_BY_ID, payload: response.data })



        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
