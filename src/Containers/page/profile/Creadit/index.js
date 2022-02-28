import React, { useState, useEffect } from 'react'
import Styles from './index.module.scss';
// import SearchNationalCode from './SearchNationalCode';
import Content from './Content';
import { useSelector, useDispatch } from 'react-redux';
import { creadit_v1_action_select } from "../../../../boot/api/profile/creadit/credit_v1_select/action"
import { person_v1_select_Integrate_profiles } from "../../../../boot/api/profile/person/person_v1_select_Integrate_profiles/action";



export default function Index() {

    const stateReducer = useSelector(state => state.creadit_profile_v1_reducer);
    const stateClubmember = useSelector(state => state.person_v1_select_Integrate_profiles_reducer)

    const dispatch = useDispatch();
    let nCode = { ...stateClubmember }
    const [national_id, setNational_id] = useState(nCode.national_id)

    /*--------------------api select---------------------- */
    const apiselectCreadit = (data) => {
        setNational_id(data.national_id)
        dispatch(creadit_v1_action_select(data))

        // Integrate_profiles ----> page person
        dispatch(person_v1_select_Integrate_profiles(national_id))
    }

    useEffect(() => {
        if (national_id) {
            dispatch(person_v1_select_Integrate_profiles(national_id))
            apiselectCreadit({ national_id: national_id })
        }
    }, []) //eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className={Styles['creadit']}>
            <Content
                data={stateReducer.data}
                apiselectCreadit={apiselectCreadit}
                national_id={national_id}
                setNational_id={setNational_id}
                stateClubmember={stateClubmember}
            />
        </div>
    )
}
