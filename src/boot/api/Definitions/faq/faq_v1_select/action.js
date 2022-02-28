import {
    FAQ_V1_SELECT
} from "../../../typeActions";

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function faq_v1_actions() {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "faq",
            method_type: "select",
            data: {
            }
        }

        try {
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            dispatch({ type: FAQ_V1_SELECT, payload: response.data })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}


