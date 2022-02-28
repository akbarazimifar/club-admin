import { STCOK_V1_SELECT, STCOK_V1_SELECT_EMPTY } from "./../../../typeActions";

const initState = {
    data: []
}


export const stock_v1_reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case STCOK_V1_SELECT:
            return {
                data: payload.response.data.results,
            }
        case STCOK_V1_SELECT_EMPTY:
            return initState 
            
        default:
            return state
    }

}