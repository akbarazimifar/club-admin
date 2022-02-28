import {
    COMPETITIONS_V1_SELECT_IN_RANGE
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function competitions_v1_actions_select_in_range(data) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "competition",
            method_type: "select_in_range_competitions",
            data:data
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)
            if (response.data.status !== 200 || !response.data.response.is_successful) {
                handleNoAnswarApi(dispatch)
                return
            }

            dispatch({ type: COMPETITIONS_V1_SELECT_IN_RANGE, payload: response.data })



        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
