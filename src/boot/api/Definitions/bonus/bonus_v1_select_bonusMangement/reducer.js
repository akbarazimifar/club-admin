import {
    BONUS_V1_SELECT_MANGEMENT,
    BONUS_V1_SELECT_MANGEMENT_LOADING,
} from "../../../typeActions";


const initState = {
    data: [],
    size: 20,
    total: 10000,
    loading: false,
}


export const bonus_select_mengement_reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case BONUS_V1_SELECT_MANGEMENT:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total > 10000
                    ? 10000
                    : payload.response.data.total ? payload.response.data.total : 0
            }
        case BONUS_V1_SELECT_MANGEMENT_LOADING:
            return {
                ...state,
                loading: payload
            }

        default:
            return state;
    }
}
