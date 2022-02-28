import {
    REGISTRATION_GUIDE_V1_SELECT,
} from "../../../typeActions";


const initState = {
    data: ""
}


export const  registration_guide_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case REGISTRATION_GUIDE_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
