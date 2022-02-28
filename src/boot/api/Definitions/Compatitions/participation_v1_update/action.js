import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { competitions_v1_actions_select } from "./../competitions_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function participate_v1_actions_update(data) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "competition",
            method_type: "update_participation_answer",
            data: data
        }


        try {
            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, competitions_v1_actions_select, dispatch , {})

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}