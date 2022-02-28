import {
    COURSES_V1_SELECT , COURSES_V1_EMPTY
} from "../../../typeActions";


const initState = {
    data: [],
    size : 20 ,
    total : 10000
}


export const Courses_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case COURSES_V1_SELECT:       
            return {
                ...state , 
                data: payload,
                total : payload.total?payload.total:state.total
            }
        case COURSES_V1_EMPTY :
            return {
                data: payload
            }
        default:
            return state;
    }
}
