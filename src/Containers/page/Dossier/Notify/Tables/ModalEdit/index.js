import React, { useEffect, useState } from 'react'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import JalaliUtils from "@date-io/jalaali";
import Box from "@material-ui/core/Box";
import DatePickerEdit from "../../../../../Common/Components/DatePickerEdit";
import { dateMiladi } from "../../../../../Common/method/date";
import { makeStyles } from '@material-ui/core/styles';
import { convertDigitToEnglish } from '../../../../../Common/method/convertDigitToEnglish';


const useStyles = makeStyles(() => ({
    modalEdit: {
        width: 930,
        borderRadius: 8,
        padding: 50,
        backgroundColor: "whitesmoke",
        maxHeight: 797,
        minWidth: 600,
        overflow: 'auto',
    },
    btns: {
        margin: "90px 0 0 0",
        textAlign: "right",
        width: "95%",
    }
}));


export default function Index({ data, handelSubmitUpdate, setNewButton }) {
    const classes = useStyles();

    const [state, setstate] = useState({
        startTime: null,
        startDate: null,
        endTime: null,
        endDate: null
    })

    useEffect(() => {
        setstate(prev => ({
            ...prev,
            startTime: data.body.start_time,
            startDate: data.body.start_time.split(" ")[0],
            endTime: data.body.end_time,
            endDate: data.body.end_time.split(" ")[0]
        }))
    }, [data])


    const handleChangeDate = (value, type) => {
        setstate(prev => ({
            ...prev,
            [type]: value
        }))
    }

    return (
        <div className={classes.modalEdit}>
            <Box pb={.5}>
                <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                    <Box display="flex">
                        <Box width="22%" >
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker-competition"
                                label="زمان شروع"
                                value={state.startTime}
                                onChange={(data) => handleChangeDate(`${convertDigitToEnglish(data.format('YYYY/MM/DD HH:mm:ss'))}.000000`, "startTime")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                // format="dd.MM.yyyy"
                                okLabel="تأیید"
                                cancelLabel="لغو"
                                ampm={false}
                                size="small"
                                style={{ marginTop: 0 }}
                            />
                        </Box>

                        <Box width={150} style={{ margin: "0 40px" }} >
                            <DatePickerEdit value={state.startDate} label="تاریخ شروع ">
                                {data => handleChangeDate(dateMiladi(data), 'startDate')}
                            </DatePickerEdit>
                        </Box>

                        <Box width="22%" >
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker-competition"
                                label="زمان پایان"
                                value={state.endTime}
                                onChange={(data) => handleChangeDate(`${convertDigitToEnglish(data.format('YYYY/MM/DD HH:mm:ss'))}.000000`, "endTime")}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                okLabel="تأیید"
                                cancelLabel="لغو"
                                ampm={false}
                                size="small"
                                style={{ marginTop: 0 }}
                            />
                        </Box>

                        <Box width={150} style={{ margin: "0 40px" }} >
                            <DatePickerEdit value={state.endDate} label="تاریخ پایان ">
                                {data => handleChangeDate(dateMiladi(data), 'endDate')}
                            </DatePickerEdit>
                        </Box>

                    </Box>
                </MuiPickersUtilsProvider>

            </Box>

            <div className={classes['btns']}>
                <button className={'btnsGreen'} onClick={() => handelSubmitUpdate(state)} >ذخیره </button>
                <button className={'btnsRed'} onClick={() => setNewButton(false)}>انصراف </button>
            </div>
        </div>
    )
}





// <Box
// width="23%"
// >
// <DatePickerEdit label="تاریخ پایان کلاس" value={dateMiladi(state.end_date)} >
//     {data => handleChange(`${data}`, 'end_date')}
// </DatePickerEdit>

// </Box>

// <Box
// width="23%"
// >

// <DatePickerEdit label="تاریخ شروع ثبت نام" value={state.registration_start_date}>
//     {data => handleChange(`${dateMiladi(data)} ${'00:00:00.000000'}`, 'registration_start_date')}
// </DatePickerEdit>

// </Box>
