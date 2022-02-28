import {
    DISCOUNT_CODE_SELECT,
    DISCOUNT_CODE_EXCEL_SELECT,
    DISCOUNT_CODE_EXCEL_EMPTY,
} from "../../../typeActions";


const initState = {
    data: [],
    excel: [],
    size: 20,
    total: 10000
}


export const discountCode_v1_select_reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case DISCOUNT_CODE_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total > 10000
                    ? 10000
                    : payload.response.data.total ? payload.response.data.total : 0
            }
        case DISCOUNT_CODE_EXCEL_SELECT:
            return {
                ...state,
                excel: payload.response.data.result,
            }

        case DISCOUNT_CODE_EXCEL_EMPTY:
            return {
                ...state,
                excel: []
            }

        default:
            return state;
    }
}
