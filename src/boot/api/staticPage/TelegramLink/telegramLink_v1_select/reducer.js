import {
    TELEGRAM_LINK_V1_SELECT,
} from "../../../typeActions";


const initState = {
    data: ""
}


export const  telegram_link_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case TELEGRAM_LINK_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
