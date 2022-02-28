import {
    COMPETITIONS_V1_SELECT
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function competitions_v1_actions_select(size,from,data,sort_by) {

    return async (dispatch) => {

        let config = { url: "select_request" };

        let _data = {
            table: "competition",
            method_type: "select_competitions",
            from: from ? (from - 1) * size : 0,
            data: data ? data : {},
            size: size,
            sort_by: sort_by,
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)
            if (response.data.status !== 200 || !response.data.response.is_successful) {
                handleNoAnswarApi(dispatch)
                return
            }

            dispatch({ type: COMPETITIONS_V1_SELECT, payload: response.data })



        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
