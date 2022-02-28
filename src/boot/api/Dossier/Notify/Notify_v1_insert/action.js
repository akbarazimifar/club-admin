import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { Notify_v1_select_actions } from "./../Notify_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function notify_v1_actions_insert(data , method_type) {

    return async (dispatch) => {
        let config = { url: "insert_request" };

        let _data = {
            table: "notification",
            method_type: method_type,
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