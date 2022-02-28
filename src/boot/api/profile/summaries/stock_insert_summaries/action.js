
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { summaries_v1_actions_select_filter } from './../stock_filter_summaries/action';




export function summaries_v1_actions_insert(data) {

    return async (dispatch) => {

        let config = { url: "insert_request" };

        let _data = {
            table: "stock", 
            method_type: "insert_summery",
            data: data
        }


        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, summaries_v1_actions_select_filter, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}