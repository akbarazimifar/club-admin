import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import SearchNationalCode from './SearchNationalCode';
import Router from './router';
import Info from './info';
import { checkNationalCode, checkNationalCodeLegal } from './../../../../../Common/method/NationalCode'

import { BONUS_V1_SELECT_CALCULATE_CONFIICT_EMPTY } from './../../../../../../boot/api/typeActions';
import { bonus_calculate_confiict_action } from '../../../../../../boot/api/Definitions/bonus/bonus_v1_calculate_conflict/action';


export default function Index({ setOpen, open }) {


    let dispatch = useDispatch()

    const [indexChild, setIndexChild] = useState(0)
    const [national_id, setNational_id] = useState('')

    const reduserUser = useSelector(state => state.bonus_calculate_confiict_reducer)

    const apiSelectClubmember = (id) => {

        let national_id = id

        let isOkCode = checkNationalCode(national_id)
        let isOkLegal = checkNationalCodeLegal(national_id)

        if (isOkCode || isOkLegal) {
            dispatch(bonus_calculate_confiict_action({ member_national_id: national_id }))
            return
        } else {
            let textError = 'لطفا کد ملی را به درستی وارد نمایید'
            dispatch({ type: "ALERT", payload: { status: true, textAlert: textError, typeAlert: "warning" } })
            return
        }

    }

    useEffect(() => {

        return () => {
            setOpen(false)
            setIndexChild(0)
            dispatch({ type: BONUS_V1_SELECT_CALCULATE_CONFIICT_EMPTY })
        }
    }, [])  //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (reduserUser.data.length > 0) {
            setIndexChild(1)
        }
    }, [reduserUser.data])

    return (
        <div>
            <Router indexChild={indexChild}>
                <SearchNationalCode
                    apiSelectClubmember={apiSelectClubmember}
                    national_id={national_id}
                    setNational_id={setNational_id}
                    setOpen={setOpen}
                />
                <Info data={reduserUser.data} national_id={national_id} setOpen={setOpen} />
            </Router>

        </div>
    )
}
