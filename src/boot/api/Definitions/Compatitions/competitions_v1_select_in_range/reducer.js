import {
    COMPETITIONS_V1_SELECT_IN_RANGE , 
} from "../../../typeActions";


const initState = {
    data: []
}


export const competitions_v1_select_in_range_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case COMPETITIONS_V1_SELECT_IN_RANGE:
            return {
                data: payload.response.data.results
            }

        default:
            return state;
    }
}
