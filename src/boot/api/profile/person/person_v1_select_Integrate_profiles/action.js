import ApiConfig from "../../../../../Containers/Common/Components/apiConfig";
import { PERSON_V1_SELECT_INTEGRATE_PROFILES } from "../../../typeActions";
import { handleNoAnswarApi , handleAlertMethodSelect } from "../../../../../Containers/Common/method/handleAlertAndSelectApi";

export const person_v1_select_Integrate_profiles = (national_id) => {
    return async (dispatch) => {
        let config = { url: "select_request" };

        let _data = {
            table: "clubmember",
            method_type: "select_with_profile_picture",
            data: {
                national_id: national_id
            }
        }

        try {
            let response = await ApiConfig(config, _data)

            
            let isOk = handleAlertMethodSelect(response.data ,dispatch )
            if(!isOk){
                    return 
            }

            if (response.data.response.data.results.length === 0) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "کد ملی مورد نظر یافت نشد.", typeAlert: "error" } })
                return
            }
            
            let data = {
                data: response.data,
                national_id: national_id
            }
            dispatch({ type: PERSON_V1_SELECT_INTEGRATE_PROFILES, payload: data })

        }
        catch {
            handleNoAnswarApi(dispatch)
        }

    }
  };

  