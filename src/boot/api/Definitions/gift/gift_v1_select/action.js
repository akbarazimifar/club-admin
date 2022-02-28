import {
    GIFT_V1_SELECT,
    //  GIFT_V1_SELECT_MORE
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";



export function gift_v1_actions_select(size ,from, data) {

    return async (dispatch) => {

        let config = { url: "select_request" };

        let _data = {
            table: "gift",
            method_type: "select_gifts",
            data: data ? data : {},
            from: from ? (from - 1) * size : 0,
            size: size ? size : 20
        }

        try {

            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }

            if (!response.data.response.data.results.length) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "جایزه ای وجود ندارد", typeAlert: "warning" } })
            }

            // if (!from) {
                dispatch({ type: GIFT_V1_SELECT, payload: response.data })
            // } else {
                // dispatch({ type: GIFT_V1_SELECT_MORE, payload: response.data })
              
            // }



        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
