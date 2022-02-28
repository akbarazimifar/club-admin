import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { Courses_v1_actions_select } from "./../Courses_v1_select/action";
import { handleAlertAndSelectApi , handleNoAnswarApi } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";
 




export function Courses_v1_actions_deactive(data) {

    return async (dispatch) => {
        let config = { url: "update_request" };

        let _data = {
            table: "course",
            method_type: "deactivate_course",
            data: {
                ...data
            }
        }


        try {
            let response = await ApiConfig(config, _data)
            
            handleAlertAndSelectApi(response.data, Courses_v1_actions_select, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}