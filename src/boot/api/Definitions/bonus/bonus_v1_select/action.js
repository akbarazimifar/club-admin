import {
    BONUS_V1_SELECT
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function bonus_v1_actions_select(sort_by, size, from, data, method) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "bonus",
            method_type: method ? method : "select",
            data: data ? data : {},
            from: from ? (from - 1) * size : 0,
            size: size,
            sort_by: sort_by
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            // if (
            //     response.data?.response?.error_description === "INVALID member_id"
            //   ) {
            //       alert("کدملی اشتباه می باشد.")
            //     return;
            //   }

            // if (!response.data.response.data.results.length) {
            //     dispatch({ type: "ALERT", payload: { status: true, textAlert: "اعلان بیشتری وجود ندارد", typeAlert: "warning" } })
            // }

            dispatch({ type: BONUS_V1_SELECT, payload: response.data })



        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
