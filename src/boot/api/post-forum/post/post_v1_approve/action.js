import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function post_v1_actions_approve(id, _type) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "post",
            method_type: "approve_post",
            data: {
                _id: id
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            if (response.data.status !== 200 || !response.data.response.is_successful) {
                handleNoAnswarApi(dispatch)
                return
            }
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "درخواست شما با موفقیت انجام شد.", typeAlert: "success" } })

            setTimeout(() => {
                _type.forEach(item => {
                    dispatch(item)
                })
            }, 2000);

        } catch (err) {
            handleNoAnswarApi(dispatch)
            console.log(err);
        }

    }
}