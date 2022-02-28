import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';

import { handleNoAnswarApi  } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import{post_notApproved_v1_actions_select} from '../post_v1_select/post_notApproved_v1_actions_select';
import{post_approved_v1_actions_select} from '../post_v1_select/post_Approved_v1_actions_select';
import {POST_NOTAPPROVE_V1_SELECT , POST_APPROVE_V1_SELECT} from '../../../typeActions'



export function post_v1_actions_update(data) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "update_request" };

        let _data = {
            table: "post",
            method_type: "update",
            data: {
                ...data
            }
        }

        try {
            // dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)
 
            if(response.data.status === 200 && !response.data.response.is_successful){
                dispatch({ type: "ALERT", payload: { status: true, textAlert: `خطایی رخ داد(${response.data.response.error_description})`, typeAlert: "error" } })
                    return
            }

            if (response.data.status !== 200) {
                handleNoAnswarApi(dispatch)
                return
            }

            dispatch({ type: "ALERT", payload: { status: true, textAlert: "درخواست شما با موفقیت انجام شد.", typeAlert: "success" } })

            let size =0
           setTimeout(() => {
               dispatch(post_notApproved_v1_actions_select(size, POST_NOTAPPROVE_V1_SELECT))
               dispatch(post_approved_v1_actions_select(size, POST_APPROVE_V1_SELECT))
           }, 1000);

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}