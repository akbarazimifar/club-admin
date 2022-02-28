import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { feedback_v1_actions_select } from "./../feedback_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function feedback_v1_actions_update(data) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "update_request" };

        let _data = {
            table: "feedback",
            method_type: "update",
            data: {
                ...data
            }
        }


        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, null, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}