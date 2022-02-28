import {
    PAYMENTS_V1_SELECT,
    PAYMENTS_V1_SELECT_LOADING
} from "../../typeActions";

import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";




export function payments_v1_select_actions(sort_by, size, from, data) {

    return async (dispatch) => {

        dispatch({ type: PAYMENTS_V1_SELECT_LOADING, payload: true });

        let config = { url: "select_request" };

        let _data = {
            table: "payment",
            method_type: "select_payments",
            from: from ? (from - 1) * size : 0,
            size: size ? size : 20,
            sort_by: sort_by,
            data: data ? data : {}
        }

        dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })
        
        try {

            let response = await ApiConfig(config, _data)
            let isOk = handleAlertMethodSelect(response.data, dispatch)

            if (!isOk) {
                return
            }

            dispatch({ type: PAYMENTS_V1_SELECT, payload: response.data })

        } catch (err) {

            handleNoAnswarApi(dispatch)

        } finally {

            dispatch({ type: PAYMENTS_V1_SELECT_LOADING, payload: false });
        }

    }
}