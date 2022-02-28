import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { POST_V1_SELECT_EMPTY } from "./../../../typeActions";




export function post_v1_actions_select_filter(_size, data, method_type, _type,sort_by) {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "post",
            method_type: method_type,
            from: _size,
            size: 20,
            data: {
                ...data
            },
            sort_by:sort_by? {create_date:sort_by}:{},
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)
            if (response.data.status !== 200 || !response.data.response.is_successful) {
                handleNoAnswarApi(dispatch)
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