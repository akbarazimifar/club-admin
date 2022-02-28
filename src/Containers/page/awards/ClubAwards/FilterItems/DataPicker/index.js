import React, { useState } from 'react'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import moment from "moment";
import Styles from './index.module.scss';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function Index() {

    const [selectedDateStart, handleDateStartChange] = useState(moment());


    return (
        <div className={Styles['dataPicker']}>
            <h3 className={Styles['title']}>فیلتر اطلاعات</h3>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <KeyboardDatePicker
                    clearable
                    label="فعال تا تاریخ"
                    okLabel="تایید"
                    cancelLabel="لغو"
                    clearLabel="پاک کردن"
                    labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                    value={selectedDateStart}
                    style={{ width: 140, marginRight: 50 }}
                    onChange={handleDateStartChange}
                    size="small"

                />

                <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="نمایش گروه های فعال"
                    labelPlacement="end"
                    style={{marginRight : 45 , marginTop : 10}}
                />
            </MuiPickersUtilsProvider>

        </div>
    )
}
