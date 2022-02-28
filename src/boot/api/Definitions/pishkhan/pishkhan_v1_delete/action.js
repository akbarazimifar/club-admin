import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { pishkhan_v1_actions } from "./../pishkhan_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function pishkhan_v1_actions_delete(id) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "delete_request" };

        let _data = {
            table: "pishkhan",
            method_type: "delete",
            data: {
                _id: id
            }
        }



        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, pishkhan_v1_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}