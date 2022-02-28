import {
    GIFTCASHAGGREGATED_V1_SELECT,
    GIFTCASHAGGREGATED_V1_lOADING,
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function giftCashAggregated_v1_select_actions(sort_by, size, from, data) {

    return async (dispatch) => {
        dispatch({ type: GIFTCASHAGGREGATED_V1_lOADING, payload: true });
        let config = { url: "select_request" };

        let _data = {
            table: "onlinecharge",
            method_type: "online_charge_report",
            data: data ? data : {},
            from: from ? (from - 1) * size : 0,
            size: size,
            sort_by: sort_by
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            dispatch({ type: GIFTCASHAGGREGATED_V1_lOADING, payload: false });

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            if (!response.data.response.data.results.length) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "اعلان بیشتری وجود ندارد", typeAlert: "warning" } })
            }

            dispatch({ type: GIFTCASHAGGREGATED_V1_SELECT, payload: response.data })

        } catch (err) {
            handleNoAnswarApi(dispatch)
            dispatch({ type: GIFTCASHAGGREGATED_V1_lOADING, payload: false });
        }

    }
}
