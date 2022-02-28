import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { registeration_v1_select_actions } from "../registeration_v1_select/action";
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function registration_v1_actions_insert(data) {

    return async (dispatch) => {
        let config = { url: "insert_request" };

        let _data = {
            table: "course",
            method_type: "register",
            data: data
        }


        try {
            let response = await ApiConfig(config, _data)

            if (!response.data.response.is_successful) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: `خطایی رخ داد(${response.data.response.error_description})`, typeAlert: "error" } })
                return
            }
            if (response.data.status !== 200) {
                handleNoAnswarApi(dispatch)
                return
            }

            dispatch({ type: "ALERT", payload: { status: true, textAlert: "درخواست شما با موفقیت انجام شد.", typeAlert: "success" } })
            dispatch(registeration_v1_select_actions({}, 0))


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}