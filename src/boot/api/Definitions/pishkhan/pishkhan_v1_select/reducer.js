import {
    PISHKHAN_V1_SELECT
} from "../../../typeActions";


const initState = {
    data: [],
    size:20,
    total:10000,
}


export const pishkhan_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case PISHKHAN_V1_SELECT:
            return {
                ...state , 
                data: payload,
                total: payload.response.data.total
                ? payload.response.data.total > 10000
                    ? 10000
                    : payload.response.data.total
                : 0
            }
        default:
            return state;
    }
}
