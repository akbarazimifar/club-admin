import React, { useEffect } from 'react'
import Styles from './index.module.scss';
// import SearchNationalCode from './SearchNationalCode';
import Profile from './profile';
import { useSelector, useDispatch } from 'react-redux';
import { person_v1_select_Integrate_profiles } from "../../../../boot/api/profile/person/person_v1_select_Integrate_profiles/action";
import { post_v1_actions_roll } from './../../../../boot/api/profile/person/person_v1_roll/action';
import { post_v1_actions_password } from './../../../../boot/api/profile/person/person_v1_password/action';
import { post_v1_actions_activation } from './../../../../boot/api/profile/person/person_v1_activation/action';



export default function Index() {

    const stateReducer = useSelector(state => state.person_v1_select_Integrate_profiles_reducer)
    const dispatch = useDispatch()

    /*--------------------api select---------------------- */
    const apiselectProfile = (national_id) => {
        dispatch(person_v1_select_Integrate_profiles(national_id))
    }

    useEffect(() => {
        if (stateReducer.national_id) {
            dispatch(person_v1_select_Integrate_profiles(stateReducer.national_id))
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps

    /*--------------------api update roll---------------------- */
    const apiUpdateRoll = (data, roll) => {
        let obj = {
            _id: data.id,
            category: roll
        }
        dispatch(post_v1_actions_roll(obj, person_v1_select_Integrate_profiles, data.body.national_id))
    }

    /*-------------------------------------------------------- */


    /*--------------------api update password---------------------- */
    const apiUpdatePassword = (password, data) => {
        let obj = {
            _id: data.id,
            new_password: password
        }

        dispatch(post_v1_actions_password(obj, person_v1_select_Integrate_profiles, data.body.national_id))

    }
    /*-------------------------------------------------------- */

    /*--------------------api update activation---------------------- */
    const apiUpdateActivation = (method_type, id, national_id) => {
        dispatch(post_v1_actions_activation(method_type, id, national_id))
    }
    /*-------------------------------------------------------- */


    return (
        <div className={Styles['person']}>
            <Profile
                data={stateReducer.data}
                apiUpdateRoll={apiUpdateRoll}
                apiselectProfile={apiselectProfile}
                apiUpdatePassword={apiUpdatePassword}
                apiUpdateActivation={apiUpdateActivation}
                national_id={stateReducer.national_id}
                member_id={stateReducer.data.length ? stateReducer.data[0].id : null}
            />
            {/* {
                stateReducer.data.length 
                ? <Profile
                    data={stateReducer.data}
                    apiUpdateRoll={apiUpdateRoll}
                    apiselectProfile={apiselectProfile}
                    apiUpdatePassword={apiUpdatePassword}
                    apiUpdateActivation={apiUpdateActivation}
                    national_id={stateReducer.national_id}
                  />
                 :
                    <SearchNationalCode
                        apiselectProfile={apiselectProfile}
                    />
            } */}
        </div>
    )
}


