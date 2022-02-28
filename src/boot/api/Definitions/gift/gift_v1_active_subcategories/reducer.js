import {
    GIFT_V1_SUBCATEGORIES
} from "../../../typeActions";


const initState = {
    data: [],
}


export const gift_v1_select_Reducer_subcategories = (state = initState, { type, payload }) => {

    switch (type) {
        case GIFT_V1_SUBCATEGORIES:
            return {
                data: payload,
            }
        default:
            return state;
    }
}
