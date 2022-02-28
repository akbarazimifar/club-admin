import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi,handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function post_v1_actions_remove(data, action) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "insert_request" };

        let _data = {
            table: "post",
            method_type: "insert",
            data: data
        }

        try {
            let response = await ApiConfig(config, _data)  
            handleAlertAndSelectApi(response.data, action, dispatch)


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}