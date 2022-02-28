import {
    BONUS_V1_SELECT_REQUESTS
} from "../../../typeActions";


const initState = {
    data: [],
    size : 50 ,
    total : 10000
}


export const bonus_request_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case BONUS_V1_SELECT_REQUESTS:
            return {
                ...state ,
                data: payload.response.data.results ,
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
