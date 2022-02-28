import {
    JOBSOPPORTUNITIES_V1_SELECT,
} from "../../typeActions";


const initState = {
    data: ""
}


export const  JobsOpportunities_v1_select_Reducer = (state = initState, { type, payload }) => {

    switch (type) {
        case JOBSOPPORTUNITIES_V1_SELECT:
            return { data: payload }
        default:
            return state;
    }
}
