import { STOCK_CASH_SELECT, STOCK_CASH_SELECT_LOADING } from "../../../typeActions"

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig'
import { handleAlertMethodSelect, handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function stockCash_select_action(sort_by, size, from, data) {

    return async (dispatch) => {

        dispatch({ type: STOCK_CASH_SELECT_LOADING, payload: true });

        let config = { url: "select_request" };

        let _data = {
            table: "codal",
            method_type: "select_codal_participation",
            from: from ? (from - 1) * size : 0,
            size: size,
            sort_by: sort_by ? sort_by : {},
            data: data ? data : {}
        }

        dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

        try {
            let response = await ApiConfig(config, _data)
            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }


            dispatch({ type: STOCK_CASH_SELECT, payload: response.data })


        } catch (err) {
            handleNoAnswarApi(dispatch)
        } finally {
            dispatch({ type: STOCK_CASH_SELECT_LOADING, payload: false });
        }

    }
}