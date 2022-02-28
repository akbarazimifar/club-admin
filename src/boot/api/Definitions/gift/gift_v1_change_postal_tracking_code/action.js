import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleAlertAndSelectApi, handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { gift_v1_actions_select_registrations } from '../gift _v1_registrations/action';





export function gift_v1_change_postal_tracking_code(data , dataSelect) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "gift",
            method_type: "change_postal_tracking_code",
            data: {     
                ...data
            }
        }

        try {
            let response = await ApiConfig(config, _data)
                handleAlertAndSelectApi(response.data, gift_v1_actions_select_registrations, dispatch , dataSelect)
        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}