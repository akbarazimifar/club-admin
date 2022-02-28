
import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi, handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { signal_v1_select_actions } from "../action";

export const signal_v1_deactive_actions = (data, dataForSelect) => {
    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "HADAFHAFEZ",
            method_type: "deactivate_signal_document",
            data,
        };

        try {
            dispatch({
                type: "ALERT",
                payload: {
                    status: true,
                    textAlert: "در حال بازخوانی",
                    typeAlert: "info",
                },
            });

            let res = await ApiConfig(config, _data);
            handleAlertAndSelectApi(res.data, signal_v1_select_actions, dispatch, dataForSelect)

        } catch (err) {
            alert("catch")
            handleNoAnswarApi(dispatch);
        }
    };
};
