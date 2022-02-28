import {
    EDUCATION_VIDEO_V1_SELECT,
} from "../../../typeActions";


const initState = {
    data: ""
}


export const  education_video_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case EDUCATION_VIDEO_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
