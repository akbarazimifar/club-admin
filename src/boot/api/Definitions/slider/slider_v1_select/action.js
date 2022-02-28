import {
    SLIDER_V1_SELECT
} from "../../../typeActions";

import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";



export function slider_v1_select_actions() {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "static",
            method_type: "select",
            data: {
                name: "slider"
            }
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            dispatch({ type: SLIDER_V1_SELECT, payload: response.data.response.data.results })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}