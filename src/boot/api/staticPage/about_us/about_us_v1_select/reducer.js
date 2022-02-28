import {
    ABOUT_US_V1_SELECT,
} from "../../../typeActions";


const initState = {
    data: ''
    
}


export const  about_us_v1_select_actions_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case ABOUT_US_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
