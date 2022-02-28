import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { systems_v1_select_actions } from '../systems_v1_select/action';

import { handleAlertAndSelectApi , handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";



export function systems_v1_update_actions(data, id) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "static",
            method_type: "update",
            data: {
                name: "systems",
                content: data,
                _id: id
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, systems_v1_select_actions, dispatch)


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}