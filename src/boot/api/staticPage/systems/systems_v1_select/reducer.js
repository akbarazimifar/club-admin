import {
    SYSTEMS_V1_SELECT,
} from "../../../typeActions";


const initState = {
    data: ""
}


export const  systems_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case SYSTEMS_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
