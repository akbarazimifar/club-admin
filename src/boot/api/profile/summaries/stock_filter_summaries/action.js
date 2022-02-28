import {
    STOCK_V1_SELECT_SUMMARIES_PAGE_STOCK
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function summaries_v1_actions_select_filter(data) {

    return async (dispatch) => {

        let config = { url: "select_request" };

        let _data = {
            table: "stock",
            method_type: "select_summaries",
            data: data ? data : {}
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }     

            dispatch({ type: STOCK_V1_SELECT_SUMMARIES_PAGE_STOCK, payload: response.data.response.data.results })


            // if (!data) {
            //     dispatch({ type: STOCK_V1_SELECT_SUMMARIES, payload: response.data.response.data.results })
            // }else{
            //     dispatch({ type: STOCK_V1_SELECT_SUMMARIES_MORE, payload: response.data.response.data.results })
            // }


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}