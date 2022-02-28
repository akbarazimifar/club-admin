import {
    SELECT_CLUBMEMBER_BY_BOURSE_CODE_COUNT,
} from "../../typeActions";


const initState = {
    data:{
        total:0,
        results:[]
    }
}


export const  select_clubmember_by_bourse_code_count_reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case SELECT_CLUBMEMBER_BY_BOURSE_CODE_COUNT:
            return { data: payload }
        default:
            return state;
    }
}
