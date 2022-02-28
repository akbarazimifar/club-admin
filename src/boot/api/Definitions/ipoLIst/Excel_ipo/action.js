import {SELECT_IPOLIST_EXCEL} from '../../../typeActions'

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";



export function ipoList_select_excel_action(val) {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "ipo",
            method_type: "select_registered_ipos_csv",
            data: {
            }
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            dispatch({ type: SELECT_IPOLIST_EXCEL, payload: response.data.response.data.results })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}