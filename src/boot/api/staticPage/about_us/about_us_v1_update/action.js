import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import {about_us_v1_select_actions} from '../about_us_v1_select/action';
import { handleAlertAndSelectApi , handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";



export function  about_us_v1_update_actions(data , id) {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });

        let config = { url: "update_request" };

        let _data = {
            table: "static",
            method_type: "update",
            data: {
                name: "about",
                content:data,
                _id: id
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, about_us_v1_select_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}