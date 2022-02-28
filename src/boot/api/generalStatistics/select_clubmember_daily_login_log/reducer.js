import {
    SELECT_CLUBMEMBER_DAILY_LOGIN_LOG,
} from "../../typeActions";


const initState = {
    data:{
        total:0,
        results:[]
    }
}


export const select_clubmember_daily_login_log_reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case SELECT_CLUBMEMBER_DAILY_LOGIN_LOG:
            return { data: payload }
        default:
            return state;
    }
}
