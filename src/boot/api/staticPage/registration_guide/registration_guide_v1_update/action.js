import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { registration_guide_v1_select_actions } from '../registration_guide_v1_select/action';
import { handleAlertAndSelectApi , handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";



export function registration_guide_v1_update_actions(data, id) {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });

        let config = { url: "update_request" };

        let _data = {
            table: "static",
            method_type: "update",
            data: {
                name: "registration_guide",
                content: data,
                _id: id
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, registration_guide_v1_select_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}