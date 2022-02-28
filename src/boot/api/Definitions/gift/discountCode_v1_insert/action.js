import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { discountCode_v1_select_actions } from "./../discountCode_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";
import {
    DISCOUNT_CODE_EXCEL_SELECT,
} from "../../../typeActions";





export function discountCode_v1_insert_action(data) {

    return async (dispatch) => {
        let config = { url: "insert_request" };

        let _data = {
            table: "discountcode",
            method_type: "insert_bulk_discount_code",
            data: data ? data : {}
        }

        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, discountCode_v1_select_actions, dispatch)
        
            if (!response.data.response.data.result.length) {
                return
            }

            dispatch({ type: DISCOUNT_CODE_EXCEL_SELECT, payload: response.data })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}