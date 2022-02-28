
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { summaries_v1_actions_select_filter } from './../stock_filter_summaries/action';




export function summaries_v1_actions_active(id) {

    return async (dispatch) => {

        let config = { url: "update_request" };

        let _data = {
            table: "stock",
            method_type: "activate_summery",
            data: {
                _id: id
            }
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