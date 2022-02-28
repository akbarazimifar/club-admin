import React, { useState, useEffect } from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { convertDigitToEnglish } from "./../../method/convertDigitToEnglish";



jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function Index({ label, children, value }) {

    const [selectedDateStart, handleDateStartChange] = useState(null);

    useEffect(() => {
        if (selectedDateStart)
            if (typeof selectedDateStart === 'object') {
                children(convertDigitToEnglish(selectedDateStart.format("jYYYY/jMM/jDD")))
            }
        

    }, [selectedDateStart])//eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (value)
            handleDateStartChange(value)
    }, [value])


    return (
        <div>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <KeyboardDatePicker
                    clearable
                    label={label}
                    okLabel="تایید"
                    cancelLabel="لغو"
                    clearLabel="پاک کردن"
                    labelFunc={selectedDateStart ? date => date.format("jYYYY/jMM/jDD") : ""}
                    value={selectedDateStart}
                    style={{ width: '100%' }}
                    onChange={data => handleDateStartChange(data)}
                    size="small"
                    // format="jYYYY/jMM/jDD"
                    // minDateMessage={<p>آیکون را کلیک کنید</p>}
                // minDate={moment().subtract(6, "months")}
                // maxDate={moment()}
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}