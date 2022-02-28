import {
    FEEDBACK_V1_SELECT,FEEDBACK_V1_SELECT_SUBMITTED
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function feedback_v1_actions_select(method,value,size,from,data,sort_by) {
    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        
        // if (value === 0) {
        //     method = "select_submitted_feedback";
        //   } else {
        //     method = "select_answered_feedback";
        //   }
        let config = { url: "select_request" };

        let _data = {
            table: "feedback",
            method_type: method,
            from: from ? (from - 1) * size : 0,
            size:size,
            data:data?data:{},
            sort_by: sort_by,
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            if(value === 0){
                dispatch({ type: FEEDBACK_V1_SELECT, payload: response.data.response.data })
            }else{
                dispatch({ type: FEEDBACK_V1_SELECT_SUBMITTED, payload: response.data.response.data})
            }
          


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}