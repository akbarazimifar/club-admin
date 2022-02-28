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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function Index() {
    const [selectedDateStart, handleDateStartChange] = useState(moment());
    const [selectedDateEnd, handleDateEndChange] = useState(moment());

    const [mainGroup, setMainGroup] = React.useState('');


    return (
        <div className={Styles['dataPicker']}>
            <h3 className={Styles['title']}>فیلتر اطلاعات</h3>
            <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                <KeyboardDatePicker
                    clearable
                    label=" تاریخ"
                    okLabel="تایید"
                    cancelLabel="لغو"
                    clearLabel="پاک کردن"
                    labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                    value={selectedDateStart}
                    style={{ width: 140, marginRight: 50 }}
                    onChange={handleDateStartChange}
                    size="small"

                />

                <KeyboardDatePicker
                    clearable
                    label="فعال تا تاریخ"
                    okLabel="تایید"
                    cancelLabel="لغو"
                    clearLabel="پاک کردن"
                    labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                    value={selectedDateEnd}
                    style={{ width: 140, marginRight: 50 }}
                    onChange={handleDateEndChange}
                    size="small"

                />
            </MuiPickersUtilsProvider>

            <div>
                <FormControl>
                    <InputLabel style={{ marginRight: 50 }}
                        id="demo-simple-select-helper-label">گروه اصلی</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={mainGroup}
                        onChange={(event) => setMainGroup(event.target.value)}
                        style={{ width: 140, marginRight: 50 }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel style={{ marginRight: 50 }}
                        id="demo-simple-select-helper-label">گروه اصلی</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={mainGroup}
                        onChange={(event) => setMainGroup(event.target.value)}
                        style={{ width: 140, marginRight: 50 }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel style={{ marginRight: 50 }}
                        id="demo-simple-select-helper-label">گروه اصلی</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={mainGroup}
                        onChange={(event) => setMainGroup(event.target.value)}
                        style={{ width: 140, marginRight: 50 }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                
                <FormControl>
                    <InputLabel style={{ marginRight: 50 }}
                        id="demo-simple-select-helper-label">گروه اصلی</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={mainGroup}
                        onChange={(event) => setMainGroup(event.target.value)}
                        style={{ width: 140, marginRight: 50 }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>


                <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="جوایز فیزیکی"
                    labelPlacement="end"
                    style={{ marginRight: 45, marginTop: 10 }}
                />

                <FormControlLabel
                    value="end"
                    control={<Checkbox color="primary" />}
                    label="تجمیعی"
                    labelPlacement="end"
                    style={{ marginRight: 45, marginTop: 10 }}
                />


            </div>

        </div>
    )
}
