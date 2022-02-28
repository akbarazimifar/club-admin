import {
    BONUS_V1_AGGREGATED,
    BONUS_V1_AGGREGATED_LOADING
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function bonus_aggregated_v1_actions_select(sort_by, size, from, data) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "bonus",
            method_type: "select_aggregated_bonus",
            data: data ? data : {},
            from: from ? (from - 1) * size : 0,
            size: size,
            sort_by: sort_by
        }

        dispatch({ type: BONUS_V1_AGGREGATED_LOADING, payload: true })

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            if (!response.data.response.data.results.length) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "اعلان بیشتری وجود ندارد", typeAlert: "warning" } })
            }

            dispatch({ type: BONUS_V1_AGGREGATED, payload: response.data })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        } finally {
            dispatch({ type: BONUS_V1_AGGREGATED_LOADING, payload: false })
        }

    }
}

