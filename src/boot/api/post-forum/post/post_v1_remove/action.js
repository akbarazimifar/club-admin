import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function post_v1_actions_remove(id, action) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "update_request" };

        let _data = {
            table: "post",
            method_type: "remove_post",
            data: {
                _id: id
            }
        }

        try {
            let response = await ApiConfig(config, _data)

            if (response.data.status !== 200 || !response.data.response.is_successful) {
                handleNoAnswarApi(dispatch)
                return
            }

            dispatch({ type: "ALERT", payload: { status: true, textAlert: "درخواست شما با موفقیت انجام شد.", typeAlert: "success" } })

            setTimeout(() => {
                dispatch(action)
            }, 2000);
            
            // handleAlertAndSelectApi(response.data, action, dispatch , parent_post_id)


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}