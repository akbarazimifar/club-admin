import {
    GIFT_V1_SELECT_REGISTRATIONS
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function gift_v1_actions_select_registrations(value) {

    return async (dispatch) => {

        let config = { url: "select_request" };

        let _data = {
            table: "gift",
            method_type: "select_registrations",
            data: value.data ? value.data : {},
            from: value.from ? (value.from - 1) * value.size : 0,
            size: value.size ? value.size : 50,
            sort_by: value.sort ? value.sort : {}
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }


            if (!response.data.response.data.results.length) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "درخواستی وجود ندارد", typeAlert: "warning" } })
            }

            dispatch({ type: GIFT_V1_SELECT_REGISTRATIONS, payload: response.data })



        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}