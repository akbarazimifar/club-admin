import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { POST_V1_SELECT_EMPTY } from "./../../../typeActions";





export function post_notApproved_v1_actions_select(_size, _type,sort_by) {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "post",
            method_type: "select_reject",
            from: _size,
            size: 20,
            data: {
                "is_visible": "TRUE"
                // approve_date: "1970/01/01 00:00:00.000000"
            },
            sort_by:sort_by? {create_date:sort_by}:{},
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                if (_size === 0) {
                    dispatch({ type: POST_V1_SELECT_EMPTY })
                }
                return
            }

            dispatch({ type: _type, payload: response.data })

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}