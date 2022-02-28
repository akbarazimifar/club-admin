import React, { useState } from 'react'
import { dateConverttShamsiToMiladi } from '../../../../Common/method/date';
import { makeStyles, LinearProgress } from '@material-ui/core';
import DatePicker from './../../../../Common/Components/DatePicker';
import Box from "@material-ui/core/Box";
import { TextField } from '@material-ui/core';
import { bonus_caclculate_connfilict_insert } from '../../../../../boot/api/Definitions/bonus/bonus_v1_caclculate_connfilict_insert';
import { handleAlertAndSelectApi, handleNoAnswarApi } from '../../../../Common/method/handleAlertAndSelectApi';
import AlertDialogSlide from '../../../../Common/Components/AlertDialogSlide';
import { useDispatch } from 'react-redux';

let useStyles = makeStyles({
    root: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,1)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTop: '1px solid rgba(0,0,0,0.5)',
        borderBottom: '1px solid rgba(0,0,0,0.5)',
        // paddingBottom: 10
    },
    textFildes: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',

    }
})


export default function Index({ value, setValue, setFlagApiCalculate, setflagApi }) {

    let classes = useStyles();
    let dispatch = useDispatch()

    const [falg, setfalg] = useState(false)
    const [loading, setloading] = useState(false);

    const handleChange = (data, type) => {
        setValue((prev) => ({ ...prev, [type]: data }));
    };

    const submit = () => {
        setFlagApiCalculate(prev => !prev)
        setflagApi(prev => !prev)
    }


    const apiSubmitInsert = () => {

        setfalg(false)

        if (!value.member_national_id) {
            alert('شناسه کاربر رو وارد کنید')
            return
        }

        let _data = {
            member_national_id: value.member_national_id
        }

        setloading(true)

        bonus_caclculate_connfilict_insert(_data)
            .then((res) => {
                handleAlertAndSelectApi(res.data, null, dispatch)
                setloading(false)
                if (res.data.response.error_code) {
                    return
                }
                setTimeout(() => {
                    setflagApi(prev => !prev)
                }, 1500);
            })
            .catch(() => {
                setloading(false)
                handleNoAnswarApi(dispatch)
            })

    }


    return (
        <>
            {
                loading && (
                    <LinearProgress />
                )
            }
            <div className={classes['root']}>
                <div className={classes['textFildes']}>
                    <Box width={200} m={3}>
                        <DatePicker label="از تاریخ">
                            {(data) =>
                                handleChange(
                                    data
                                        ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                                        : null,
                                    "conflict_from_date"
                                )
                            }
                        </DatePicker>
                    </Box>
                    <Box width={200} m={3}>
                        <DatePicker label="تا تاریخ">
                            {(data) =>
                                handleChange(
                                    data
                                        ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000`
                                        : null,
                                    "conflict_to_date"
                                )
                            }
                        </DatePicker>
                    </Box>
                    <Box width={230} style={{ margin: "0 50px 0 0" }}>
                        <TextField
                            value={value.member_national_id}
                            onChange={(e) => handleChange(e.target.value, 'member_national_id')}
                            label="کدملی"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    </Box>
                </div>
                <div>
                    <button className="btnsGreen" onClick={() => submit()}> گزارش</button>
                    <button className={'btnsBlue'} onClick={() => setfalg(prev => !prev)}> ثبت</button>
                </div>
            </div>

            {
                falg && (
                    <AlertDialogSlide
                        flagShow={falg}
                        handleCloseAlert={setfalg}
                        handleOkAlert={apiSubmitInsert}
                        data={dataAlert}
                    />
                )
            }
        </>
    )
}


const dataAlert = {
    title: "",
    description: "آیا مطمئن می باشید؟",
};
