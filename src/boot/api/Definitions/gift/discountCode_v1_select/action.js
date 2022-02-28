import {
    DISCOUNT_CODE_SELECT
} from "../../../typeActions";

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function discountCode_v1_select_actions(sort_by,size ,from, data) {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "discountcode",
            method_type: "select_single_discount_code",
            from: from ? (from - 1) * size : 0,
            size: size ? size : 20,
            sort_by : sort_by,
            data: data ? data : {}
        }

        try {
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }


            dispatch({ type: DISCOUNT_CODE_SELECT, payload: response.data })
         

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}