import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { faq_v1_actions } from "./../faq_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function FAQ_v1_actions_edit(data) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "faq",
            method_type: "update",
            data: {
                ...data
            }
        }


        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, faq_v1_actions, dispatch)
        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}