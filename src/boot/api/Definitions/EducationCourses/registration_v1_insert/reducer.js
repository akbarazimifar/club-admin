import {
    REGISTRATION_COURSE_V1_INSERT, REGISTRATION_COURSE_V1_EMPTY
} from "../../../typeActions";


const initState = {
    dataProfile: [],
    isOkProfile: false
}


export const registeration_v1_select_insert = (state = initState, { type, payload }) => {
    switch (type) {
        case REGISTRATION_COURSE_V1_INSERT:
            return { ...state, dataProfile: payload.response.data.results, isOkProfile: true }
        case REGISTRATION_COURSE_V1_EMPTY:
            return { ...state, isOkProfile: false, dataProfile: [] }
        default:
            return state
    }
}
