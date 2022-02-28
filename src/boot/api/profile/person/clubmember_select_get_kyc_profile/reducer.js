import { GET_KYC_PROFILE_SELECT , GET_KYC_PROFILE_REMOVE } from "../../../typeActions";


const initState = {
    data: [],
    isOk: false
}


export const reducer_get_kyc_profile = (state = initState, { type, payload }) => {
    switch (type) {
        case GET_KYC_PROFILE_SELECT:
            return {
                data: payload,
                isOk: true
            }
        case GET_KYC_PROFILE_REMOVE :
            return initState
        default:
            return state
    }

}