import { CREADIT_PROFILE_V1_SELECT , CREADIT_PROFILE_V1_EMPTY } from "../../../typeActions";

const initState = {
    data: [],
    isOk: false
}


export const creadit_profile_v1_reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case CREADIT_PROFILE_V1_SELECT:
            return {
                data: payload.response.data.results,
                isOk: true
            }
        case CREADIT_PROFILE_V1_EMPTY :
            return initState
        default:
            return state
    }

}