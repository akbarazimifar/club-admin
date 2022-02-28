
import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { handleNoAnswarApi, handleAlertAndSelectApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { SubscriptionPlans_v1_select_actions } from "../action";

export const SubscriptionPlans_v1_insert_actions = (data, dataForSelect) => {
    return async (dispatch) => {
        let config = { url: "insert_request" };

        let _data = {
            table: "HADAFHAFEZ",
            method_type: "insert_new_subscription_plan",
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
            handleAlertAndSelectApi(res.data, SubscriptionPlans_v1_select_actions, dispatch, dataForSelect)

        } catch (err) {
            alert("catch")
            handleNoAnswarApi(dispatch);
        }
    };
};
