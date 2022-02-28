
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi, handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { management_data_stock_actions } from '../stock_v1_select/action';




export function stock_v1_actions_update(data) {

    return async (dispatch) => {

        let config = { url: "update_request" };

        let _data = {
            table: "stock",
            method_type: "update_stock",
            data: data
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            handleAlertAndSelectApi(response.data, management_data_stock_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}