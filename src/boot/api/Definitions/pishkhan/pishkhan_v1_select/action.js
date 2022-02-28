import {
    PISHKHAN_V1_SELECT
} from "../../../typeActions";

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi  , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function pishkhan_v1_actions(sort_by,size,from,data) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "pishkhan",
            method_type: "select",
            from: from ? (from - 1) * size : 0,
            size:size,
            data: data?data:{},
            sort_by:sort_by,
        }

        try {


            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)
            

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }


            dispatch({ type: PISHKHAN_V1_SELECT, payload: response.data })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}