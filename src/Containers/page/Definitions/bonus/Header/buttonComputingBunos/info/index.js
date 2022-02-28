import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { makeStyles, LinearProgress } from '@material-ui/core'
import { dateMiladiToShamsi } from '../../../../../../Common/method/date';
import { handleNumber } from '../../../../../../Common/method/displayData';
import AlertDialogSlide from "../../../../../../Common/Components/AlertDialogSlide";
import { handleAlertAndSelectApi, handleNoAnswarApi } from '../../../../../../Common/method/handleAlertAndSelectApi';
import { bonus_caclculate_connfilict_insert } from '../../../../../../../boot/api/Definitions/bonus/bonus_v1_caclculate_connfilict_insert';




let useStyles = makeStyles({
    root: {
        width: "100%",
        height: "90%",
        display: " flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 13,
        position: 'relative'
    },
    grid: {
        width: "100%",
        borderRadius: ' 8px',
        backgroundColor: 'white',
        // boxShadow: '1px 1px 3px rgba(0,0,0,0.1)',
        // padding: '10px',
    },
    card: {
        width: "100%",
        minWidth: '300px',
        height: "auto",
        display: " flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        minHeight: 200,
        width: '100%',
        flexWrap: 'wrap',
        "& p": {
            "& span": {
                "& .price": {
                    display: "inline-block",
                    direction: "rtl",
                },
                marginLeft: '10px',
            }
        }
    },
    btn: {
        textAlign: 'right',
        marginTop: '15px',
    },
    status: {
        display: " flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        width: '50%',
    },
    contentUser: {
        display: " flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: 'wrap',
        maxWidth: 451,

        '& p': {
            width: 225,
        },

    },
    LinearProgress: {
        position: 'absolute',
        top: -16,
        left: -31,
        width: "114%"
    }

})


export default function Index({ data, setOpen }) {

    let dispatch = useDispatch();
    let classes = useStyles();

    const [falg, setfalg] = useState(false)
    const [loading, setloading] = useState(false);

   
    const apiInsertIpo = () => {

        setfalg(false)

        if (!data[0].body.member_national_id) {
            alert('شناسه کاربر رو وارد کنید')
            return
        }

        let _data = {
            member_national_id: data[0].body.member_national_id
        }

        setloading(true)

        bonus_caclculate_connfilict_insert(_data)
            .then((res) => {
                handleAlertAndSelectApi(res.data, null, dispatch)
                setloading(false)
                if (res.data.response.error_code) {
                    return
                }
                setOpen(prev => !prev)
            })
            .catch(() => {
                setloading(false)
                handleNoAnswarApi(dispatch)
            })

    }

    return (
        <div style={{ position: 'relative' }}>
            {
                loading && (
                    <LinearProgress className={classes['LinearProgress']} />
                )
            }
            <div className={classes['root']}>
                <div className={classes['grid']}>
                    <div className={classes['card']}>
                        <div className={classes['content']}>
                            <div className={classes['contentUser']}>

                                <p>
                                    <span>نام نام خانوادگی</span>:

                               <span>
                                        {
                                            data[0].body.member_first_name
                                        }
                                        {' '}
                                        {
                                            data[0].body.member_last_name
                                        }
                                    </span>
                                </p>
                                <p>
                                    <span>کدملی</span>:
                             <span>
                                        {
                                            data[0].body.member_national_id
                                        }
                                    </span>
                                </p>
                                <p>
                                    <span>شناسه باشگاه</span>:
                             <span>
                                        {
                                            data[0].body.automation_member_automation_club_id
                                        }
                                    </span>
                                </p>
                                <p>
                                    <span>شناسه اتوماسیون</span>:
                             <span>
                                        {
                                            data[0].body.automation_member_automation_id
                                        }
                                    </span>
                                </p>
                                {/* <p>
                                <span>تاریخ ثبت نام</span>:
                             <span>
                                    {
                                        data[0].body.member_registration_date
                                            ? dateMiladiToShamsi(data[0].body.member_registration_date.split(' ')[0])
                                            : ''
                                    }
                                </span>
                            </p> */}

                                <p>
                                    <span>تاریخ مغایرت از</span>:
                             <span>
                                        {
                                            data[0].body.conflict_from_date
                                                ? dateMiladiToShamsi(data[0].body.conflict_from_date.split(' ')[0])
                                                : ''
                                        }
                                    </span>
                                </p>
                                <p>
                                    <span>تاریخ مغایرت تا</span>:
                             <span>
                                        {
                                            data[0].body.conflict_to_date
                                                ? dateMiladiToShamsi(data[0].body.conflict_to_date.split(' ')[0])
                                                : ''
                                        }
                                    </span>
                                </p>
                            </div>
                            <hr />
                            <p>
                                <p>امتیاز گردش روزانه:</p>
                                <p style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                                    <p>باشگاه:
                                  {
                                            handleNumber(data[0].body.DAILY_TURNOVER_SCORE.total_club_bonus)
                                        }
                                    </p>
                                    <p>اتوماسیون:
                                {
                                            handleNumber(data[0].body.DAILY_TURNOVER_SCORE.total_automation_bonus)
                                        }
                                    </p>
                                </p>
                            </p>
                            <hr />
                            <p>
                                <p>امتیاز گردش ماهانه:</p>
                                <p style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                                    <p>باشگاه:
                                   {
                                            handleNumber(data[0].body.MONTHLY_FUTURE_TURNOVER_SCORE.total_club_bonus)
                                        }
                                    </p>
                                    <p>اتوماسیون:
                                   {
                                            handleNumber(data[0].body.MONTHLY_FUTURE_TURNOVER_SCORE.total_automation_bonus)
                                        }
                                    </p>
                                </p>
                            </p>
                            <hr />
                            <p>
                                <p>امتیاز گردش معرف:</p>
                                <p style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                                    <p>باشگاه:
                                   {
                                            handleNumber(data[0].body.INTRODUCER_TURNOVER_SCORE.total_club_bonus)
                                        }

                                    </p>
                                    <p>اتوماسیون:
                                   {
                                            handleNumber(data[0].body.INTRODUCER_TURNOVER_SCORE.total_automation_bonus)
                                        }
                                    </p>
                                </p>
                            </p>
                            <hr />
                        </div>

                    </div>
                    <div className={classes['btn']}>
                        <button className={'btnsBlue'} onClick={() => setfalg(prev => !prev)}> تایید</button>
                        <button className={'btnsRed'} onClick={() => setOpen(prev => !prev)} >لغو</button>
                    </div>
                    {
                        falg && (
                            <AlertDialogSlide
                                flagShow={falg}
                                handleCloseAlert={setfalg}
                                handleOkAlert={apiInsertIpo}
                                data={dataDelete}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

const dataDelete = {
    title: "",
    description: "آیا مطمئن می باشید؟",
};
