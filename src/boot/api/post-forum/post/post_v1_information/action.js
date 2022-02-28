import {
    POST_V1_INFORMATIN, POST_V1_INFORMATIN_EMPTY
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function post_v1_actions_information(id) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "post",
            method_type: "select",
            data: {
                _id: id,
            }
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }


            dispatch({ type: POST_V1_INFORMATIN, payload: response.data, id })


        } catch (err) {

            console.log(err);
            handleNoAnswarApi(dispatch)
        }

    }
}

export function post_v1_actions_information_empty() {
    return (dispatch) => {
        dispatch({ type: POST_V1_INFORMATIN_EMPTY})
    }

}