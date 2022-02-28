import {
    SLIDER_V1_SELECT,
} from "../../../typeActions";


const initState = []


export const slider_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case SLIDER_V1_SELECT:
            return payload
        default:
            return state
    }
}
