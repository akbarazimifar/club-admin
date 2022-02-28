import {
    PAYMENTS_V1_SELECT,
    PAYMENTS_V1_SELECT_LOADING
} from "../../typeActions";


const initState = {
    data: [],
    size: 20,
    total: 10000,
    loading: false,
}


export const payments_v1_select_reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case PAYMENTS_V1_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total > 10000
                    ? 10000
                    : payload.response.data.total ? payload.response.data.total : 0
            }
        case PAYMENTS_V1_SELECT_LOADING:
            return {
                ...state,
                loading: payload
            }

        default:
            return state;
    }
}
