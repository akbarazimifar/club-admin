
import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import {JobsOpportunities_v1_select_actions} from '../JobsOpportunities_v1_select/action';
import { handleAlertAndSelectApi , handleNoAnswarApi } from "./../../../../Containers/Common/method/handleAlertAndSelectApi";



export function  jobsOpportunities_v1_update_actions(  data,  id) {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });
        let config = { url: "update_request" };

        let _data = {
            table: "static",
            method_type: "update",
            data: {
                name: "job_opportunities",
                content:data,
                _id: id,
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, JobsOpportunities_v1_select_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)

        }

    }
}