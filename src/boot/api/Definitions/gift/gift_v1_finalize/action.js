import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { gift_v1_actions_select_registrations } from "./../gift _v1_registrations/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function gift_v1_actions_finalize(data, dataSelect) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "gift",
            method_type: "finalize",
            data: data
        }


        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, gift_v1_actions_select_registrations, dispatch , dataSelect)
        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}