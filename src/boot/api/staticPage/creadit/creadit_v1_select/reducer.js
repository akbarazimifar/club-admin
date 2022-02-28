import {
    CREADIT_V1_SELECT,
} from "../../../typeActions";


const initState = {
    data: ""
}


export const  creadit_v1_select_actions_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case CREADIT_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
