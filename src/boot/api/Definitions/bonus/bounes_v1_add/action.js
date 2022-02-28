import ApiConfig from '../../../../../Containers/Common/Components/apiConfig';
import { bonus_v1_actions_select } from "./../bonus_v1_select/action";
import { handleAlertAndSelectApi, handleNoAnswarApi , handleAlertMethodSelect } from "./../../../../../Containers/Common/method/handleAlertAndSelectApi";





export function bonus_v1_actions_add(data) {

    return async (dispatch) => {

        let configMember = { url: "select_request" };

        let _dataMember = {
            table: "clubmember",
            method_type: "select",
            data: {
                national_id: data.national_id
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
                let config = { url: "insert_request" };

                let { national_id, ...dataOther } = data
                let setdata = {
                    ...dataOther,
                    member_id: responseMember.data.response.data.results[0].id,
                    closing_date: null,
                    status: null,
                    bonus_type: null,
                    source: null,
                }

                let _data = {
                    table: "bonus",
                    method_type: "add_bonus",
                    data: setdata
                }

                try {
                    let response = await ApiConfig(config, _data)
                    handleAlertAndSelectApi(response.data, bonus_v1_actions_select, dispatch)
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