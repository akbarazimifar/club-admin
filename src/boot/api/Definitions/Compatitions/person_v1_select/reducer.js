import { COMPETITIONS_PROFILE_V1_SELECT , COMPETITIONS_PROFILE_V1_EMPTY } from "../../../typeActions";

const initState = {
    data: [],
}


export const competitions_profile_v1_reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case COMPETITIONS_PROFILE_V1_SELECT:
            return {
                data: payload.response.data.results,

            }
        case COMPETITIONS_PROFILE_V1_EMPTY :
            return{
                data:[]
            }

        default:
            return state
    }

}