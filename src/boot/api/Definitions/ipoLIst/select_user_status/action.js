

import { handleNoAnswarApi , handleAlertMethodSelect } from '../../../../../Containers/Common/method/handleAlertAndSelectApi';
import {SELECT_USER_STATUS} from '../../../typeActions'

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig'



export function select_user_status_action(data) {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "ipo",
            method_type: "select_user_status",
            data: data ? data : {}
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            dispatch({ type: SELECT_USER_STATUS, payload: response.data.response.data.results })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
