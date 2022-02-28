import {
    POST_V1_SELECT_FILTER,
    POST_V1_SELECT_MORE_FILTER
} from "../../../typeActions";


const initState = []


export const post_v1_select_Reducer_filter = (state = initState, { type, payload }) => {
    switch (type) {
        case POST_V1_SELECT_FILTER:
            if (payload.response.data.results.length === 0) {
                alert("پستی وجود ندارد")
            }
            return payload.response.data.results

        case POST_V1_SELECT_MORE_FILTER:
            if (payload.response.data.results.length === 0) {
                alert("پست جدیدی وجود ندارد")
            }
            return [...state, ...payload.response.data.results]
        default:
            return state;
    }
}
