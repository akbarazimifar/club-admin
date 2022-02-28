import {
    NOTIFY_V1_SELECT,NOTIFY_V1_SELECT_NATION_ID
} from "../../../typeActions";


const initState = {
    data: [],
    size:20,
    total:10000,
 
}


export const Notify_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {

        case NOTIFY_V1_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total? payload.response.data.total : state.total,
                flag:false
            }
        // case NOTIFY_V1_SELECT_NATION_ID:
        //     return {
        //         ...state,
        //         data: payload.response.data.results,
        //         total2: payload.response.data.total? payload.response.data.total : state.total,
        //         flag:true
        //     }

        // case NOTIFY_V1_SELECT_MORE:
        //     return {
        //         data: [
        //             ...state.data , 
        //             ...payload
        //         ],
        //         from: state.from +20
        //     }
        // case NOTIFY_V1_SELECT_TOTAL:
        //     return {
        //         ...state,
        //         data: payload.response.data.results,
        //         total: payload.response.data.total,
        //     }
        default:
            return state
    }
}
