import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import {COMPETITIONS_PROFILE_V1_SELECT } from "../../../typeActions";
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export const competitions_profile_v1_action_select = (national_id) => {
    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "clubmember",
            method_type: "select",
            data: {
                national_id: national_id
            }
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
            if(response.data.response.data.results.length === 0){
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "کد ملی مورد نظر یافت نشد.", typeAlert: "error" } })
                return
            }

                  dispatch({ type: COMPETITIONS_PROFILE_V1_SELECT, payload: response.data })

        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
}