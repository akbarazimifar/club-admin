import ApiConfig from '../../../Containers/Common/Components/apiConfig';
import { handleAlertAndSelectApi, handleNoAnswarApi  , handleAlertMethodSelect} from "./../../../Containers/Common/method/handleAlertAndSelectApi";
import {CLUB_MEMBER_SELECT_DATA,CLUB_MEMBER_SELECT_RESET} from '../typeActions'


export function permitions_v1_actions(national_id, permitted_methods,value) {

    return async (dispatch) => {

        let configMember = { url: "select_request" };

        let _dataMember = {
            table: "clubmember",
            method_type: "select",
            data: {
                national_id: national_id
            }
        }

        try {
            
            let responseMember = await ApiConfig(configMember, _dataMember)

            let isOk = handleAlertMethodSelect(responseMember.data ,dispatch )
            if(!isOk){
                    return 
            }

            if (!responseMember.data.response.data.results.length) {
                dispatch({ type: "ALERT", payload: { status: true, textAlert: "کد ملی مورد نظر یافت نشد.", typeAlert: "error" } })
            }
            else {
                if(value === 'true'){
                    dispatch({type:CLUB_MEMBER_SELECT_DATA,payload:responseMember.data.response.data.results})
                    return
                }
                let config = { url: "update_request" };

                let _data = {
                    table: "clubmember",
                    method_type: "update",
                    data: {
                        _id: responseMember.data.response.data.results[0].id,
                        permitted_methods: permitted_methods.trim()
                    }
                }

                try {
                    let response = await ApiConfig(config, _data)
                    handleAlertAndSelectApi(response.data, null, dispatch)
                    dispatch({type:CLUB_MEMBER_SELECT_RESET})
                }
                catch (err) {
                    handleNoAnswarApi(dispatch)
                    console.log("catch add member");
                }

            }
        }

        catch {
            handleNoAnswarApi(dispatch)
            console.log("catch club member");
            return
        }

    }
}