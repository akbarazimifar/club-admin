import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import {  handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";
import { REGISTRATION_COURSE_V1_INSERT, REGISTRATION_COURSE_V1_EMPTY } from "../../../typeActions";





export function registration_v1_actions_profile(id) {

    return async (dispatch) => {
        let configProfile = { url: "select_request" };

        let _dataProfile = {
            table: "clubmember",
            method_type: "select",
            data: {
                national_id: id
            }
        }


        try {
            let response = await ApiConfig(configProfile, _dataProfile)

            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                dispatch({ type: REGISTRATION_COURSE_V1_EMPTY })
                    return 
            }

            if (response.data.response.data.results.length === 0) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "کد ملی مورد نظر یافت نشد.", typeAlert: "error" } })
                dispatch({ type: REGISTRATION_COURSE_V1_EMPTY })
                return
            }

            dispatch({ type: REGISTRATION_COURSE_V1_INSERT, payload: response.data })


        } catch (err) {
            handleNoAnswarApi(dispatch)
        }

    }
}