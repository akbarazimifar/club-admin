

import { handleNoAnswarApi , handleAlertMethodSelect } from '../../../../../Containers/Common/method/handleAlertAndSelectApi';
import {SELECT_IPO_LIST_TITLE} from '../../../typeActions'

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig'



export function ipoList_select_title_action(data,sort_by) {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "ipo",
            method_type: "select_ipos",
            sort_by: sort_by,
            data:data?data:{}
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            dispatch({ type: SELECT_IPO_LIST_TITLE, payload: response.data.response.data.results })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
