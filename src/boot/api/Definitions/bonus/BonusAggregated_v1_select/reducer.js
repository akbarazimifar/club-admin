import {
    BONUS_V1_AGGREGATED,
    BONUS_V1_AGGREGATED_LOADING
} from "../../../typeActions";


const initState = {
    data: [],
    size : 50 ,
    total : 10000,
    loading:false
}


export const bonus_aggregated_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case BONUS_V1_AGGREGATED:
            return {
                ...state,
                data: payload.response.data.results,
                total : payload.response.data.total ? payload.response.data.total  : 10000
            }
        case BONUS_V1_AGGREGATED_LOADING:
            return {
                ...state,
                loading: payload, 
            }
        default:
            return state;
    }
}
