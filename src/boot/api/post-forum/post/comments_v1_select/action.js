import {
    COMMENTS_V1_SELECT , COMMENTS_V1_EMPTY
} from "../../../typeActions";
import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export function comments_v1_actions_select(id) {

    return async (dispatch) => {
        // dispatch({ type: faq_V1_loading });
        let config = { url: "select_request" };

        let _data = {
            table: "post",
            method_type: "select",
            data: {
                parent_post_id:id
            }
        }

        try {
            dispatch({ type: "ALERT", payload: { status: true, textAlert: "در حال بازخوانی", typeAlert: "info" } })
            
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

             if( response.data.response.data.results.length !== 0)
                dispatch({ type: COMMENTS_V1_SELECT, payload: response.data , id })
            


        } catch (err) {
          
            console.log(err);
            handleNoAnswarApi(dispatch)
        }

    }
}

export function comments_v1_actions_empty() {
    return async (dispatch) => {
        let data = [];
      return  dispatch({ type: COMMENTS_V1_EMPTY, payload: data  })
    }

}