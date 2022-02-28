

import { handleNoAnswarApi, handleAlertMethodSelect } from '../../../../../Containers/Common/method/handleAlertAndSelectApi';
import { BONUS_V1_SELECT_SELECT_CONFIICT, BONUS_V1_SELECT_SELECT_CONFIICT_LOADING } from '../../../typeActions'

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig'


export function bonus_select_confiict_action(sort_by, size, from, data,) {

    return async (dispatch) => {

        dispatch({ type: BONUS_V1_SELECT_SELECT_CONFIICT_LOADING, payload: true })

        let config = { url: "select_request" };

        let _data = {
            table: "bonus",
            method_type: "select_bonus_conflicts",
            data: data ? data : {},
            from: from ? (from - 1) * size : 0,
            size: size,
            sort_by: sort_by
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            dispatch({ type: BONUS_V1_SELECT_SELECT_CONFIICT, payload: response.data.response.data })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        } finally {
            dispatch({ type: BONUS_V1_SELECT_SELECT_CONFIICT_LOADING, payload: false })
        }

    }
}
