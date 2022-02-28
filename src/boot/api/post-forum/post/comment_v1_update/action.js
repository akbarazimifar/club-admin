import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function post_v1_actions_update(data  , action , parent_post_id) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "update_request" };

        let _data = {
            table: "post",
            method_type: "update",
            data: {
                ...data
            }
        }

        try {
            // dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, action, dispatch , parent_post_id )


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}