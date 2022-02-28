import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { discountCode_v1_select_actions } from "./../discountCode_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function discountCode_v1_remove(data) {

    return async (dispatch) => {
        let config = { url: "delete_request" };

        let _data = {
            table: "discountcode",
            method_type: "delete",
            data: data ? data : {}
        }

        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, discountCode_v1_select_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}