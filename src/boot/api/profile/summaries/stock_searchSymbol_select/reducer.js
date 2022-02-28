import {
    STOCK_V1_SELECT_SEARCHSYMBOL
} from "../../../typeActions";


const initState = {
    data: [],
}


export const stock_select_searchsymbol_reducer = (state = initState, { type, payload }) => {

    switch (type) {

        case STOCK_V1_SELECT_SEARCHSYMBOL:
            return {
                data: payload,
            }

        default:
            return state;
    }
}
