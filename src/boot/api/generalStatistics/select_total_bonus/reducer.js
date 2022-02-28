import {
    SELECT_TOTAL_BONUS,
} from "../../typeActions";


const initState = {
    data:{
        total:0,
        results:[]
    }
}


export const  select_total_bonus_reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case SELECT_TOTAL_BONUS:
            return { data: payload }
        default:
            return state;
    }
}
