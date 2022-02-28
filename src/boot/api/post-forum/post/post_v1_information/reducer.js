import {
    POST_V1_INFORMATIN, POST_V1_INFORMATIN_EMPTY
} from "../../../typeActions";


const initState = {
    data: ""
}


export const post_v1_information_Reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case POST_V1_INFORMATIN:
            return { data: payload }

        case POST_V1_INFORMATIN_EMPTY:
            return { data: "" }

        default:
            return state;
    }
}
