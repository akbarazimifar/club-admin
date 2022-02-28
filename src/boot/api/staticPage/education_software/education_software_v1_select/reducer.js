import {
    EDUCATION_SOFTWARE_V1_SELECT,
} from "../../../typeActions";


const initState = {
    data: ""
}


export const  education_software_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case EDUCATION_SOFTWARE_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
