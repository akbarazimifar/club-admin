

import { handleNoAnswarApi, handleAlertMethodSelect } from '../../../../../Containers/Common/method/handleAlertAndSelectApi';
import { BONUS_V1_SELECT_CALCULATE_CONFIICT, BONUS_V1_SELECT_CALCULATE_CONFIICT_LOADING } from '../../../typeActions'

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig'


export function bonus_calculate_confiict_action(data) {

    return async (dispatch) => {

        dispatch({ type: BONUS_V1_SELECT_CALCULATE_CONFIICT_LOADING, payload: true })

        let config = { url: "select_request" };

        let _data = {
            table: "bonus",
            method_type: "select_calculate_bonus_conflict",
            data: data ? data : {}
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)
            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            dispatch({ type: BONUS_V1_SELECT_CALCULATE_CONFIICT, payload: response.data.response.data.results })

        } catch (err) {

            handleNoAnswarApi(dispatch)

        } finally {
            dispatch({ type: BONUS_V1_SELECT_CALCULATE_CONFIICT_LOADING, payload: false })
        }

    }
}
