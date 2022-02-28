import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { registeration_v1_select_actions } from "./../registeration_v1_select/action";
import { handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function registration_v1_actions_activation(type, id) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "course",
            method_type: type,
            data: {
                _id: id
            }
        }


        try {
            let response = await ApiConfig(config, _data)

            if (response.data.status === 200 && response.data.response.is_successful) {
                dispatch(registeration_v1_select_actions({}, 0))
            }

            else if (response.data.status === 200 && !response.data.response.is_successful) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: `خطایی رخ داد(${response.data.response.error_description})`, typeAlert: "error" } })

            } else if (response.data.status !== 200) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "در ارتباط با سرور مشکلی رخ داده است.", typeAlert: "error" } })
            }


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}