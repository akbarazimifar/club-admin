import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import Router from './Router';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { GET_KYC_PROFILE_REMOVE } from './../../../../../../boot/api/typeActions';




export default function Index({ open, setOpen, profile  }) {

    const dispatch = useDispatch()
    const [indexChild, setIndexChild] = useState(3)
    const [state, setstate] = useState({ national_id: '' })
    const textError = 'فیلد اجباری می باشد '


    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setIndexChild(0)
                setstate({ national_id: '' })
            }, 500);
            dispatch({ type: GET_KYC_PROFILE_REMOVE })
        }
    }, [open])//eslint-disable-line react-hooks/exhaustive-deps 

    useEffect(() => {
        if (profile) {
            setTimeout(() => {
                setstate({
                    member_id: profile.id,
                    national_id: profile.body.national_id
                })
            }, 600);
        }
    }, [profile])





    return (
        <div>
            <Router open={open} setOpen={setOpen} indexChild={indexChild}>
                <StepOne
                    state={state}
                    setOpen={setOpen}
                    setIndexChild={setIndexChild}
                />
                <StepTwo
                    open={open}
                    state={state}
                    setOpen={setOpen}
                    textError={textError}
                    setIndexChild={setIndexChild}
                />
                <StepThree
                    open={open}
                    profile={state}
                    setOpen={setOpen}
                    textError={textError}
                    setIndexChild={setIndexChild}
                />
            </Router>
        </div>
    )
}
