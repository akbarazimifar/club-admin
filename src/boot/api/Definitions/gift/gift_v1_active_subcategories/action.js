import {
    GIFT_V1_SUBCATEGORIES
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function gift_v1_actions_active_subcategories(filter) {

    return async (dispatch) => {

        let config = { url: "select_request" };

        let _data = {
            table: "gift",
            method_type: "select_active_subcategories",
            data: filter ? filter : {} ,
            from : 0 , 
            size : 50
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
            

            dispatch({ type: GIFT_V1_SUBCATEGORIES, payload: response.data.response.data.results })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}
