import {
    GIFTCASHAGGREGATED_V1_SELECT,
    GIFTCASHAGGREGATED_V1_EMPTY,
    GIFTCASHAGGREGATED_V1_lOADING,
    GIFTCASHAGGREGATED_V1_SELECT_FILTER,
} from "../../../typeActions";


const initState = {
    data:'',
    size: 50,
    total: 10000,
    loading: false
}


export const giftCashAggregated_v1_select_reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case GIFTCASHAGGREGATED_V1_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total ? payload.response.data.total : 10000
            }
        case GIFTCASHAGGREGATED_V1_SELECT_FILTER:
            return {
                ...state,
                data: payload,
            }
        case GIFTCASHAGGREGATED_V1_lOADING:
            return {
                ...state,
                loading: payload
            }
        case GIFTCASHAGGREGATED_V1_EMPTY:
            return {
                ...state,
                data: '',
                loading: false
            }
        default:
            return state;
    }
}
