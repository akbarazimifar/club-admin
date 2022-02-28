import {
    LOGIN_V1_TYPE_SUCCESS, LOGIN_V1_loading, LOGIN_V1_TYPE_error, ERROR405
} from "../typeActions";


const initState = {
    isAuthenticates: JSON.parse(sessionStorage.getItem('login')),
    // isAuthenticates: {member_id : "hfdjfh" , token :"djhsadjuhsaj"},
    loading: false,
    error: ''
}


export const login_v1_Reducer = (state = initState, { type, payload }) => {

    switch (type) {

        case LOGIN_V1_loading:

            return {
                ...state,
                error: '',
                loading: true
            }

        case LOGIN_V1_TYPE_SUCCESS:

            if (payload.status === 200 && payload.response.is_successful === true) {

                const { member_id, token, member_permitted_methods } = payload.response.data;
                sessionStorage.setItem('login', JSON.stringify({ member_id: member_id, token: token, member_permitted_methods: member_permitted_methods }));

                return {
                    ...state,
                    loading: false,
                    isAuthenticates: { member_id: member_id, token: token }
                };

            }

            if (payload.status === 200 && payload.response.is_successful === false) {
                return {
                    ...state,
                    loading: false,
                    error: 'نام کاربری یا پسورد اشتباه می باشد لطفا مجددا سعی نمایید'
                };
            }

            if (payload.status !== 200) {
                return {
                    ...state,
                    loading: false,
                    error: 'خطا در ارتباط با سرور'
                };
            }
            break
        case LOGIN_V1_TYPE_error:
            return {
                ...state,
                loading: false,
                error: 'خطا در ارتباط با سرور'
            }

        case ERROR405:
            sessionStorage.removeItem('login');
            return {
                ...state,
                isAuthenticates: null
            }
        default:
            return state;
    }
}
