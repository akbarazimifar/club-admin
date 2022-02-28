import {
    STOCK_V1_SELECT_SUMMARIES, STOCK_V1_SELECT_SUMMARIES_PAGE_STOCK, STOCK_V1_SELECT_SUMMARIES_PAGE_STOCK_EMPTY
} from "../../typeActions";


const initState = {
    data: [],
    isinJson: {},
    pageStock: [],
}


export const stock_select_summaries_reducer = (state = initState, { type, payload }) => {

    switch (type) {

        case STOCK_V1_SELECT_SUMMARIES:
            let obj = {}

            payload.forEach(element => {
                obj[element.body.isin] = element.body.short_name
            });
            let result = []
            let all = [...state.data, ...payload]
            result = all.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.place === thing.place && t.id === thing.id
                ))
            )

            return {
                data: result,
                isinJson: { ...state.isinJson, ...obj },
                pageStock: result
            }
        case STOCK_V1_SELECT_SUMMARIES_PAGE_STOCK:
            return {
                ...state,
                pageStock: payload,
            }
        case STOCK_V1_SELECT_SUMMARIES_PAGE_STOCK_EMPTY:
            return {
                ...state,
                pageStock: []
            }
        default:
            return state;
    }
}
