import {
    LOGIN_V1_TYPE_SUCCESS,
    LOGIN_V1_loading,
    LOGIN_V1_TYPE_error
} from "../typeActions";



import ApiConfig from '../../../Containers/Common/Components/apiConfig';

export function login_v1_actions(data) {

    return async (dispatch) => {
  
        dispatch({ type: LOGIN_V1_loading });


        let config = { url: "login" };
        let _data = {
            table: "",
            method_type: "login",
            data: {
                "user": data.userName,
                "pass": data.passWord
            }
        }

        try {
            let response = await ApiConfig(config, _data)
            dispatch({ type: LOGIN_V1_TYPE_SUCCESS, payload: response.data })

        } catch (err) {
           dispatch({ type: LOGIN_V1_TYPE_error, payload: err })
        }

    }
}

