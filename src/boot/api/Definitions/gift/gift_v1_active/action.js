import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { gift_v1_actions_select } from "./../gift_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function gift_v1_actions_activate(data) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "gift",
            method_type: "activate_gift",
            data: data
        }


        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, gift_v1_actions_select, dispatch)

    


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}