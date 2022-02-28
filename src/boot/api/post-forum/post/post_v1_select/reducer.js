import {
    POST_NOTAPPROVE_V1_SELECT,
    POST_NOTAPPROVE_V1_SELECT_MORE,
    POST_APPROVE_V1_SELECT,
    POST_APPROVE_V1_SELECT_MORE,
    POST_NOTVISIBLE_V1_SELECT,
    POST_NOTVISIBLE_V1_SELECT_MORE,
    POST_V1_SELECT_EMPTY
} from "../../../typeActions";


const initState = {
    notApprove: [],
    approve: [],
    fromNotApprove: 0,
    fromApprove: 0,
    notVisible: [],
    fromNotVisible: 0
}


export const post_v1_select_Reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case POST_NOTAPPROVE_V1_SELECT:
            return {
                ...state,
                notApprove: payload.response.data.results,
                fromNotApprove: 0
            }
        case POST_NOTAPPROVE_V1_SELECT_MORE:
            if (payload.response.data.results.length === 0) {
                alert("پست جدیدی وجود ندارد")
            }
            return {
                ...state,
                notApprove: [...state.notApprove, ...payload.response.data.results],
                fromNotApprove: state.fromNotApprove + 20
            }
        case POST_APPROVE_V1_SELECT:
            return {
                ...state,
                approve: payload.response.data.results,
                fromApprove: 0

            }
        case POST_APPROVE_V1_SELECT_MORE:
            if (payload.response.data.results.length === 0) {
                alert("پست جدیدی وجود ندارد")
            }
            return {
                ...state,
                approve: [...state.approve, ...payload.response.data.results],
                fromApprove: state.fromApprove + 20
            }




        case POST_NOTVISIBLE_V1_SELECT:
            return {
                ...state,
                notVisible: payload.response.data.results,
                fromNotVisible: 0

            }
        case POST_NOTVISIBLE_V1_SELECT_MORE:
            if (payload.response.data.results.length === 0) {
                alert("پست جدیدی وجود ندارد")
            }
            return {
                ...state,
                notVisible: [...state.notVisible, ...payload.response.data.results],
                fromNotVisible: state.fromNotVisible + 20
            }


        case POST_V1_SELECT_EMPTY:
            return initState
        default:
            return state;
    }
}
