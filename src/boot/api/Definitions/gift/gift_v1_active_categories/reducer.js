import {
    GIFT_V1_CATEGORIES
} from "../../../typeActions";


const initState = {
    data: [],
}


export const gift_v1_select_Reducer_categories = (state = initState, { type, payload }) => {

    switch (type) {
        case GIFT_V1_CATEGORIES:
            return {
                data: payload,
            }
        default:
            return state;
    }
}
