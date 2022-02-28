import {
    PERFORMANCE_SELECT_BY_ID , PARTICIPATIONS_ById_V1_EMPTY
} from "../../../typeActions";


const initState = {
    data: []
}


export const performance_v1_select_by_id_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case PERFORMANCE_SELECT_BY_ID:
            return {
                data: payload.response.data.results
            }
        case PARTICIPATIONS_ById_V1_EMPTY :
            return{
                data :[]
            }
        default:
            return state;
    }
}
