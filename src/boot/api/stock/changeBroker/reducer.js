import {
    CHANGE_BROKER_SELECT,
    CHANGE_BROKER_SELECT_IMG,
    CHANGE_BROKER_SELECT_EMPTY,
} from "../../typeActions";


const initState = {
    data: [],
    dataImg: [],
    size: 20,
    total: 10000
}


export const changeBroker_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case CHANGE_BROKER_SELECT:
            return {
                ...state,
                data: payload.response.data.results,
                total: payload.response.data.total > 10000
                    ? 10000
                    : payload.response.data.total ? payload.response.data.total : 0

            }
        case CHANGE_BROKER_SELECT_IMG:
            return {
                ...state,
                dataImg: payload.response.data.results,
            }
        case CHANGE_BROKER_SELECT_EMPTY:
            return {
                ...state,
                dataImg: []
            }

        default:
            return state;
    }
}
