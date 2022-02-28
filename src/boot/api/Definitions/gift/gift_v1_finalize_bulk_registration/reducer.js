import {
    GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION, GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION_EMPTY
} from "../../../typeActions";


const initState = {
    data: [],
}


export const gift_v1_select_finalize_bulk_registration_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION:
            return {
                data: payload
            }
        case GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION_EMPTY:
            return initState
        default:
            return state;
    }
}
