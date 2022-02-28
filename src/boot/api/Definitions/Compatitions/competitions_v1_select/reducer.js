import {
    COMPETITIONS_V1_SELECT
} from "../../../typeActions";


const initState = {
    data: [],
    size:20,
    total:200
}


export const competitions_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case COMPETITIONS_V1_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.total?payload.total:state.total
            }


        default:
            return state;
    }
}
