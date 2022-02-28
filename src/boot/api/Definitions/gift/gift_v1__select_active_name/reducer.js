import {
    GIFT_V1_SELECT_ACTIVE_NAME
} from "../../../typeActions";


const initState = {
    data: [],
}


export const gift_v1_select_active_name_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case GIFT_V1_SELECT_ACTIVE_NAME:
            return {
                data: payload.response.data.results,
            }
        default:
            return state;
    }
}