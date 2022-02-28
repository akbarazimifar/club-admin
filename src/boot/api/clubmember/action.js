import ApiConfig from "../../../Containers/Common/Components/apiConfig";
import { CLUB_MEMBER_SELECT, CLUB_MEMBER_SELECT_ERROR } from "../typeActions";
import { handleNoAnswarApi  , handleAlertMethodSelect } from "../../../Containers/Common/method/handleAlertAndSelectApi";




export const club_member_v1_action_select = (national_id) => {
    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "clubmember",
            method_type: "select",
            data: {
                national_id: national_id
            }
        }

        try {
            let response = await ApiConfig(config, _data)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                dispatch({ type: CLUB_MEMBER_SELECT_ERROR })
                return 
            }
            
            if (response.data.response.data.results.length === 0) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "کد ملی مورد نظر یافت نشد.", typeAlert: "error" } })
                dispatch({ type: CLUB_MEMBER_SELECT_ERROR })
                return
            }

            dispatch({ type: CLUB_MEMBER_SELECT, payload: response.data })

        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
}