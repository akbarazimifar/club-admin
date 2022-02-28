import {
    
} from "../../typeActions";

import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import { ACCOUNTS_v1_actions } from '../accounts_v1_select/action';
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../Containers/Common/method/handleAlertAndSelectApi";



export function ACCOUNTS_V1_EDIT_INSERT_DELETE_ACTIONS(data, id) {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });

        let config = { url: "update_request" };

        let _data = {
            table: "static",
            method_type: "update",
            data: {
                name: "accounts",
                content: data,
                _id: id
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, ACCOUNTS_v1_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}