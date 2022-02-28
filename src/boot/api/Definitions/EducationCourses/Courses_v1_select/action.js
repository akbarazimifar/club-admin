import {
    COURSES_V1_SELECT, COURSES_V1_EMPTY
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function Courses_v1_actions_select(sort_by ,size, from, data) {


    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "select_request" };
        let _data = {
            table: "course",
            method_type: "select_courses",
            from: from ? (from - 1) * size : 0,
            size: size , 
            data:data?data:{},
            sort_by:sort_by,
        }
        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data, dispatch)
            if (!isOk) {
                return
            }
            
            dispatch({ type: COURSES_V1_SELECT, payload: response.data })



        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}

export function comments_v1_actions_empty() {
    return async (dispatch) => {
        let data = [];
        return dispatch({ type: COURSES_V1_EMPTY, payload: data })
    }

}