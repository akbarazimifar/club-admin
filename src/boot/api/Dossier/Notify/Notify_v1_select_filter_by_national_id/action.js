import {
    NOTIFY_V1_SELECT, NOTIFY_V1_SELECT_NATION_ID
} from "../../../typeActions";

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";



export function Notify_v1_select_actions_filter_by_national_id(sort_by,size,from, data) {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "notification",
            method_type: "select_notifications_by_national_id",
            data: data ? data : {},
            from: from ? (from - 1) * size : 0,
            size: size,
            sort_by : sort_by
        }

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
                dispatch({ type: NOTIFY_V1_SELECT_NATION_ID, payload: response.data})

        } catch (err) {
            console.log("catch");

            handleNoAnswarApi(dispatch)
        }

    }
}