import {
    CHANGE_BROKER_SELECT
} from "../../typeActions";

import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";




export function changeBroker_v1_select_actions(sort_by,size ,from, data) {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "changebroker",
            method_type: "select_change_brokers",
            from: from ? (from - 1) * size : 0,
            size: size,
            sort_by : sort_by ?sort_by : {},
            data: data ? data : {}
        }

        try {
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            if (!response.data.response.data.results.length) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "رکوردی وجود ندارد", typeAlert: "warning" } })
                return;
            }

            dispatch({ type: CHANGE_BROKER_SELECT, payload: response.data })
         

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}