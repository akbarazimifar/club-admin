import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";

import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import moment from "moment";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextEditorQuill from '../../../../Common/Components/TextEditorQuill';



jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });



const useStyles = makeStyles((theme) => ({

    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(6, 4, 3),
        minWidth: 800
    },
    margin: {
        margin: "7px 0"
    },
    textEditor: {
        width: "100%",
        marginTop: 10,
        height : 150,
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 15
    },
    viewImg: {
        width: "70%",
        height: 300,
        backgroundColor: "#ECECEC",
        display: "inline-block",
        float: "right"
    },
    boxImg: {
        width: "90%",
        height: "70%",
        backgroundColor: "white",
        margin: "5% auto",
        // marginTop: "",
    },
    editEmg: {
        backgroundColor: "white",
        outline: "none",
        marginTop: 20,
        float: 'right',
        marginRight: '5%',
        borderRadius: 5
    }
}));

export default function NewButton({handleCloseModal}) {
    const [selectedDateStart, handleDateStartChange] = useState(moment());
    const classes = useStyles();
    const [mainGroup, setMainGroup] = React.useState('');
    const [subsidiaryGroup, setSubsidiaryGroup] = React.useState('');

    return (
        <div className={classes.paper} >
            <Box>
                <Grid container alignContent="space-between">
                    <Grid md="6">
                        <div>
                            <TextField
                                label="عنوان"
                                id="titleNewButton"
                                defaultValue=""
                                variant="outlined"
                                size="small"
                                className={classes.margin}
                            />

                            <TextareaAutosize
                                style={{ width: "75%", padding: 10 }}
                                className={classes.margin}
                                aria-label="minimum height" rowsMin={3} placeholder="توضیحات" />

                            <TextField
                                label="امتیاز مورد نیاز"
                                id="titleNewButton"
                                defaultValue=""
                                variant="outlined"
                                size="small"
                                className={classes.margin}
                            />

                            <Box>
                                <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa"
                                >
                                    <KeyboardDatePicker
                                        clearable
                                        label="تاریخ انقضا"
                                        okLabel="تایید"
                                        cancelLabel="لغو"
                                        clearLabel="پاک کردن"
                                        labelFunc={date => (date ? date.format("jYYYY/jMM/jDD") : "")}
                                        value={selectedDateStart}
                                        style={{ width: 140, marginRight: 50 }}
                                        onChange={handleDateStartChange}
                                        size="small"
                                        style={{ margin: "15px 0px" }} //eslint-disable-line react/jsx-no-duplicate-props
                                    />
                                </MuiPickersUtilsProvider>
                            </Box>

                            <Box>


                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-helper-label">گروه اصلی</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={mainGroup}
                                        onChange={(event) => setMainGroup(event.target.value)}
                                        style={{ width: 250, margin: "15px 0" }}
                                        className={classes.margin}
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
                                    <InputLabel id="demo-simple-select-helper-label">گروه فرعی</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={subsidiaryGroup}
                                        onChange={(event) => setSubsidiaryGroup(event.target.value)}
                                        style={{ width: 250, margin: "15px 0" }}
                                        className={classes.margin}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            <TextField
                                label="موجودی"
                                id="inventoryNewButton"
                                defaultValue=""
                                variant="outlined"
                                size="small"
                                className={classes.margin}
                            />

                            <FormControlLabel
                                value="end1"
                                control={<Checkbox color="primary" />}
                                label="تحویل فیزیکی"
                                labelPlacement="end"
                                style={{ display: "block" }}
                            />

                            <FormControlLabel
                                value="end2"
                                control={<Checkbox color="primary" />}
                                label="تحویل در شعبه"
                                labelPlacement="end"
                                style={{ display: "block" }}
                            />

                            <FormControlLabel
                                value="end3"
                                control={<Checkbox color="primary" />}
                                label="جایزه به صورت کد می ‌باشد"
                                labelPlacement="end"
                            // style={{ margin: "2px 0" }}
                            />

                            <FormControlLabel
                                value="end3"
                                control={<Checkbox color="primary" />}
                                label="دریافت شماره تماس اجباری می باشد"
                                labelPlacement="end"
                            // style={{ margin: "2px 0" }}
                            />
                        </div>
                    </Grid>
                    <Grid md="6">
                        <div className={classes.viewImg}>
                            <div className={classes.boxImg}></div>
                            {/* <button className={classes.editEmg}>ویرایش تصویر</button> */}
                            <div>
                                <TextField
                                    // label="انتخاب عکس"
                                    id="titleNewButton"
                                    defaultValue=""
                                    variant="outlined"
                                    size="small"
                                    className={classes.margin}
                                    type="file"
                                    style={{ direction: "ltr", width: "90%", marginRight: "5%" }}
                                />
                            </div>
                        </div>

                    </Grid>
                </Grid>

                <Box
                    className={classes.textEditor}
                >
                    <TextEditorQuill>
                        {data => console.log(data)}
                    </TextEditorQuill>
                </Box>

                <Box
                    className={classes.buttons}
                >
                    <button className="btnsBlue">
                        تایید
                    </button>

                    <button onClick={handleCloseModal} className="btnsRed">
                        انصراف
                    </button>
                </Box>


            </Box>
        </div>
    )
}