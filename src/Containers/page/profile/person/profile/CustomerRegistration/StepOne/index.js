import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio';
import { makeStyles, Box } from '@material-ui/core';

import { clubmember_send_kyc_otp } from '../../../../../../../boot/api/profile/person/clubmember_insert_send_kyc_otp';
import { handleAlertAndSelectApi, handleNoAnswarApi } from '../../../../../../Common/method/handleAlertAndSelectApi';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles({
    root: {
        maxWidth: 650,
        position: 'relative',
        backgroundColor: "white",
        padding: 15,
        borderRadius: 8
    }
})


export default function Index({ setIndexChild, setOpen , state }) {

    let classes = useStyles()
    const dispatch = useDispatch()


    const handelSubmit = (data) => {

        let _data = {
            national_id: data
        }

        clubmember_send_kyc_otp(_data)
            .then((res) => {

                handleAlertAndSelectApi(res.data, null, dispatch)

                if (res.data.response.data.state === "OTP SENT")
                    setIndexChild(1)
            })
            .catch(() => {
                handleNoAnswarApi(dispatch)
            })
    }


    return (
        <>
            <div className={classes['root']}>

                <div>
                    <h3>فراخوانی اطلاعات از سجام</h3>
                </div>
                <hr />

                <div>
                    <p className={'text-justify h6'}>
                        توجه فرمایید برای دریافت اطلاعات سجام بایستی شماره تماس ثبت نامی کاربر در
                    <a href="https://www.sejam.ir" target='_blanck' className={'mx-1'} style={{ color: 'blue' }}>
                            {' '}
                            سامانه سجام
                            {' '}
                        </a>
                      و وب سایت باشگاه مشتریان یکی باشد.
                </p>
                </div>
              
                <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }} >
                    <button
                        className={'btnsBlue'}
                        onClick={() => handelSubmit(state.national_id)}
                    >
                        ارسال کد تایید
                 </button>
                    <button className={'btnsRed'} onClick={() => setOpen(false)}>لغو</button>
                </Box>

            </div>
        </>
    )
}
