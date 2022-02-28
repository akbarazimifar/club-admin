import { ALERT } from "./../typeActions";

let initialState = {
    textAlert: "",
    typeAlert: "",
    status: false
}




export const reducers_alert = (state = initialState, { type, payload }) => {

    switch (type) {
        case ALERT:
            return {
                textAlert: payload.status ? payload.textAlert : "",
                typeAlert: payload.status ? payload.typeAlert : "",
                status: payload.status
            }
        default:
            return state
    }

}