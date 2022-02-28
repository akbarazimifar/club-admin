import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";

import{forum_v1_actions_select} from '../forum_v1_select/action';



export function forum_v1_actions_update(data) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "update_request" };

        let _data = {
            table: "forum",
            method_type: "update",
            data: {
                ...data
            }
        }

        try {
            // dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)
            if (response.data.status !== 200 || !response.data.response.is_successful) {
                handleNoAnswarApi(dispatch)
                return
            }

            // dispatch({ type: FORUM_V1_SELECT, payload: response.data })
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "درخواست شما با موفقیت انجام شد.", typeAlert: "success" } })
            handleAlertAndSelectApi(response.data, forum_v1_actions_select, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}