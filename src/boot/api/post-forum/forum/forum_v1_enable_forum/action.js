import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import{forum_v1_actions_select} from '../forum_v1_select/action';



export function forum_v1_actions_enable(id) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "update_request" };

        let _data = {
            table: "forum",
            method_type: "enable_forum",
            data: {
                _id : id
            }
        }

        try {
            // dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            if (response.data.status !== 200 || !response.data.response.is_successful) {
                handleNoAnswarApi(dispatch)
                return
            }

            dispatch({ type: "ALERT", payload: { status: true, textAlert: "درخواست شما با موفقیت انجام شد.", typeAlert: "success" } })
            handleAlertAndSelectApi(response.data, forum_v1_actions_select, dispatch)


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}