import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { GET_KYC_PROFILE_SELECT } from "../../../typeActions";
import { handleNoAnswarApi  , handleAlertMethodSelect} from "../../../../../Containers/Common/method/handleAlertAndSelectApi";




export const get_kyc_profile_action = (payload) => {

    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            // "api_key": "d025488f-8ec6-4434-afbe-b6a5343815a7",
            // token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
            // member_id: "_0zehXYBdxxYGfkX5_wd",
            table: "clubmember",
            method_type: "get_kyc_profile",
            data: payload ? payload : {}
        }

        try {

            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            dispatch({ type: GET_KYC_PROFILE_SELECT, payload: response.data.response.data.results })
        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
}