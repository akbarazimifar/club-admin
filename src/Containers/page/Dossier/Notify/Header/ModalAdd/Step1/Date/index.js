import React from 'react'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import JalaliUtils from "@date-io/jalaali";
import Box from "@material-ui/core/Box";
import DatePickerEdit from "../../../../../../../Common/Components/DatePickerEdit";
import { dateMiladi } from "./../../../../../../../Common/method/date";


export default function Index({ date, handleChangeDate }) {
    return (
        <Box pb={.5}>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <Box display="flex">
                    <Box width="22%" >
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker-competition"
                            label="زمان شروع"
                            value={date.startTime}
                            onChange={(data) => handleChangeDate(data, "startTime")}
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
                        <DatePickerEdit value={dateMiladi(date.startDate)}  label="تاریخ شروع ">
                            {data => handleChangeDate(data, 'startDate')}
                        </DatePickerEdit>
                    </Box>

                    <Box width="22%" >
                        <KeyboardTimePicker
                            margin="normal"
                            id="time-picker-competition"
                            label="زمان پایان"
                            value={date.endTime}
                            onChange={(data) => handleChangeDate(data, "endTime")}
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
                        <DatePickerEdit value={dateMiladi(date.endDate)} label="تاریخ پایان ">
                            {data => handleChangeDate(data, 'endDate')}
                        </DatePickerEdit>
                    </Box>

                </Box>
            </MuiPickersUtilsProvider>

        </Box>
    )
}
