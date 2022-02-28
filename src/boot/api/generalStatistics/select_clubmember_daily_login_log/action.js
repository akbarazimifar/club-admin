import {
    SELECT_CLUBMEMBER_DAILY_LOGIN_LOG
} from "../../typeActions";

import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";




export function  select_clubmember_daily_login_log_action(data) {

    return async (dispatch) => {

        let config = { url: "select_request" };

        let _data = {
            table: "CLUBMEMBER",
            method_type: "select_daily_login_log",
            data: data?data:{}
        }

        try {
            let res = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(res.data ,dispatch )
            if(!isOk){
                    return 
            }

            dispatch({ type: SELECT_CLUBMEMBER_DAILY_LOGIN_LOG, payload:res.data.response.data})
        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}