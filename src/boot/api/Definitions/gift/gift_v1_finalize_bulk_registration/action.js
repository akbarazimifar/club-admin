import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { gift_v1_actions_select_registrations } from "./../gift _v1_registrations/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION } from '../../../typeActions';





export function gift_v1_actions_finalize_bulk_registration(data, dataSelect) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "gift",
            method_type: "finalize_bulk_registration",
            data: {
                "list_data": data
            }
        }


        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, gift_v1_actions_select_registrations, dispatch, dataSelect)
            if (response.data?.response?.is_successful)
                dispatch({ type: GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION, payload: response.data.response.data.results })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}