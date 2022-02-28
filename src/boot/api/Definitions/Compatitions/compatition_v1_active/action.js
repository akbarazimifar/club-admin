import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { competitions_v1_actions_select } from "./../competitions_v1_select/action";
import {competitions_v1_actions_select_in_range} from './../competitions_v1_select_in_range/action';
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function competition_v1_actions_activate(data) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "competition",
            method_type: "activate_competition",
            data: data
        }


        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, competitions_v1_actions_select, dispatch , {})
            handleAlertAndSelectApi(response.data, competitions_v1_actions_select_in_range, dispatch,{})


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}