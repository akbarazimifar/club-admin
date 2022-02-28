import {
    JOBSOPPORTUNITIES_V1_SELECT
} from "../../typeActions";

import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../Containers/Common/method/handleAlertAndSelectApi";




export function  JobsOpportunities_v1_select_actions() {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "static",
            method_type: "select",
            data: {
                name: "job_opportunities"
            }
        }

        try {
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            dispatch({ type: JOBSOPPORTUNITIES_V1_SELECT, payload:response})
        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}