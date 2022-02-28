import {
    BONUS_V1_SELECT_MANGEMENT,
    BONUS_V1_SELECT_MANGEMENT_LOADING,
} from "../../../typeActions";

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function bonus_select_mangement_actions(sort_by, size, from, data) {

    return async (dispatch) => {

        dispatch({ type: BONUS_V1_SELECT_MANGEMENT_LOADING, payload: true });

        let config = { url: "select_request" };

        let _data = {
            table: "bonus",
            method_type: "select_management_bonus",
            from: from ? (from - 1) * size : 0,
            size: size ? size : 20,
            sort_by: sort_by,
            data: data ? data : {}
        }

        dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })
        
        try {

            let response = await ApiConfig(config, _data)
            let isOk = handleAlertMethodSelect(response.data, dispatch)

            if (!isOk) {
                return
            }

            dispatch({ type: BONUS_V1_SELECT_MANGEMENT, payload: response.data })

        } catch (err) {

            handleNoAnswarApi(dispatch)

        } finally {

            dispatch({ type: BONUS_V1_SELECT_MANGEMENT_LOADING, payload: false });
        }

    }
}