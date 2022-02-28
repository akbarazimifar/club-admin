import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { slider_v1_select_actions } from '../slider_v1_select/action';
import { handleAlertAndSelectApi, handleNoAnswarApi } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";



export function slider_v1_update_actions(data, id) {

    return async (dispatch) => {
        // dispatch({ type: LOGIN_V1_loading });

        let config = { url: "update_request" };

        let _data = {
            table: "static",
            method_type: "update",
            data: {
                name: "slider",
                content: data,
                _id: id
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            handleAlertAndSelectApi(response.data, slider_v1_select_actions, dispatch)

        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}


// content = {
//     slider_name: "HOME_PAGE",
//     content: [
//         { Title: "عنوان تصویر ۱", Link: "mobinsb.com", Priority: 2, IMAGE_URI: "C://test.jpg" },
//         { Title: "عنوان تصویر ۲", Link: "mobinsb.com", Priority: 2, IMAGE_URI: "C://test.jpg" }
//     ]
// }
