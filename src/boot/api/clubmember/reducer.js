import { CLUB_MEMBER_SELECT, CLUB_MEMBER_SELECT_EMPTY, CLUB_MEMBER_SELECT_ERROR } from "../typeActions";

const initState = {
    data: [],
    isOk: false,
}


export const club_member_v1_reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case CLUB_MEMBER_SELECT:
            return {
                data: payload.response.data.results,
                isOk: true,
            }

        case CLUB_MEMBER_SELECT_ERROR:
            return {
                ...state,
                data: [],
            }

        case CLUB_MEMBER_SELECT_EMPTY:
            return initState
        default:
            return state
    }

}