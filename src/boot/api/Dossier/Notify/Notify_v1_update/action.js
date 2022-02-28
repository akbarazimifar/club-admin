import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { Notify_v1_select_actions } from "./../Notify_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function notify_v1_actions_update(data) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "notification",
            method_type: "update_time",
            data: data
        }


        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, Notify_v1_select_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}