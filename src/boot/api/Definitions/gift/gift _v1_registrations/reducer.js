import {
    GIFT_V1_SELECT_REGISTRATIONS, GIFT_V1_SELECT_REGISTRATIONS_EMPTY
} from "../../../typeActions";


const initState = {
    data: [],
    size: 50,
    total: 10000
}


export const gift_v1_select_registration_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case GIFT_V1_SELECT_REGISTRATIONS:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total
                ? payload.response.data.total > 10000
                    ? 10000
                    : payload.response.data.total
                : 0
            }
        case GIFT_V1_SELECT_REGISTRATIONS_EMPTY:
            return initState
        default:
            return state;
    }
}
