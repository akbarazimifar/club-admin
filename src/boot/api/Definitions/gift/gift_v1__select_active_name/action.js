import {
    GIFT_V1_SELECT_ACTIVE_NAME
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function gift_v1_actions_select_active_name() {

    return async (dispatch) => {

        let config = { url: "select_request" };

        let _data = {
            table: "gift",
            method_type: "select_active_gift_names",
            data: {},
        }

        try {
            let response = await ApiConfig(config, _data)

            
            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            if (response.data.status !== 200 || !response.data.response.is_successful) {
                handleNoAnswarApi(dispatch)
                return
            }

            dispatch({ type: GIFT_V1_SELECT_ACTIVE_NAME, payload: response.data })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
