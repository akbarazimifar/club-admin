import {
    FEEDBACK_V1_SELECT,FEEDBACK_V1_SELECT_SUBMITTED
} from "../../../typeActions";


const initState = {
    data: [],
    data2:[],
    size:20,
    total:10000
}


export const feedback_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case FEEDBACK_V1_SELECT:
            return { 
                ...state,
                data: payload.results,
                data2:[],
                total:payload.total?payload.total:state.total
            }
        case FEEDBACK_V1_SELECT_SUBMITTED:
            return { 
                ...state,
                data:[],
                data2: payload.results,
                total:payload.total?payload.total:state.total
            }
        default:
            return state;
    }
}
