import {
    NOTIFY_V1_SELECT, NOTIFY_V1_SELECT_MORE
} from "../../../typeActions";


const initState = {
    data: [],
    from: 0

}


export const Notify_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case NOTIFY_V1_SELECT:
            return {
                data: payload,
                from: 0
            }

        case NOTIFY_V1_SELECT_MORE:
            return {
                data: [
                    ...state.data , 
                    ...payload
                ],
                from: state.from +20
            }
        default:
            return state
    }
}
