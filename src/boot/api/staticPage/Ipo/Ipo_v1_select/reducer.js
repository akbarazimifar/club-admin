import {
    IPO_V1_SELECT,
} from "../../../typeActions";


const initState = {
    data: ""
}


export const  ipo_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case IPO_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
