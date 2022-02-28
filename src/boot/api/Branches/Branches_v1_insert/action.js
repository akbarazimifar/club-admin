
import ApiConfig from '../../../../Containers/Common/Components/apiConfig';
import { branches_v1_select_actions } from "./../Branches_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi } from "./../../../../Containers/Common/method/handleAlertAndSelectApi";




export function branches_v1_insert_actions(data) {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });
        let config = { url: "insert_request" };

        let _data = {
            table: "shoab",
            method_type: "insert",
            data: data
        }

        try {
            let response = await ApiConfig(config, _data)
            
            handleAlertAndSelectApi(response.data, branches_v1_select_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}