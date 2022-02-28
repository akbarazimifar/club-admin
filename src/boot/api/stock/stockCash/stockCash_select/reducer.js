import { STOCK_CASH_SELECT, STOCK_CASH_SELECT_LOADING } from "../../../typeActions"


const initState = {
    data: [],
    total: 10000,
    size: 20,
    loading: false
}


export const stockCash_select_reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case STOCK_CASH_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total > 10000
                    ? 10000
                    : payload.response.data.total ? payload.response.data.total : 0
            }

        case STOCK_CASH_SELECT_LOADING:

            return {
                ...state,
                loading: payload
            }

        default:
            return state;
    }
}
