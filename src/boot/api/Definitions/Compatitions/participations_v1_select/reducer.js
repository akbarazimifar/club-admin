import {
    PARTICIPATIONS_V1_SELECT ,PARTICIPATIONS_V1_EMPTY
} from "../../../typeActions";


const initState = {
    data: [],
    size:20,
    total:500
}


export const participations_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case PARTICIPATIONS_V1_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                total:payload.response.data.total?payload.response.data.total:state.total
            }
        case PARTICIPATIONS_V1_EMPTY:
            return {
                ...state,
                data: []
            }
        default:
            return state;
    }
}
