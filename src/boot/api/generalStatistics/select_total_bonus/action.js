import {
    SELECT_TOTAL_BONUS
} from "../../typeActions";

import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";




export function select_total_bonus_action(data) {

    return async (dispatch) => {

        let config = { url: "select_request" };

        let _data = {
            table: "CLUBMEMBER",
            method_type: "select_total_bonus",
            data: data ? data : {}
        }

        try {
            let res = await ApiConfig(config, _data)
            
            let isOk = handleAlertMethodSelect(res.data, dispatch)
            if (!isOk) {
                return
            }

            dispatch({ type: SELECT_TOTAL_BONUS, payload: res.data.response.data })
            
        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}