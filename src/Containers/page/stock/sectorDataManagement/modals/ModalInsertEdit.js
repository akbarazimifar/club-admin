import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DatePicker from "./../../../../Common/Components/DatePickerEdit"
import { dateMiladi } from '../../../../Common/method/date';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: "80%",
        borderRadius: 8,
        padding: 50,
        backgroundColor: "whitesmoke",
        maxHeight: "70vh",
        minWidth: 600,
        overflow: "auto",
        display: "flex",
        flexWrap: "wrap",
        margin: "auto"
    },
    form: {
        display: "flex",
        flexWrap: "wrap",
    '& > *': {
        width: '30%',
        margin: "10px 1%"
    },
},
    buttons: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end",
    width: "100%"
}
}));

export default function ModalInsertEdit({ data, setNewButton, handleSubmitEdit, handleSubmitInsert }) {
    ///////////////////////if(data) ======> edit   else===========>insert
    const classes = useStyles();
    const [state, setstate] = useState(initState)

    const handleSubmitInsertOrSubmit = () => {
        if (data) {
            handleSubmitEdit(state, data.id)
        } else {
            handleSubmitInsert(state)
        }
    }

    useEffect(() => {
        if (data) {
            let obj = {}
            Object.keys(data.body).map(item => {
                let value = data.body[item]
                obj[item] = { label: value, value: state[item].value, type: state[item].type }
            })
            setstate(obj)
        }
    }, [])

    const handleChange = (value, isin) => {


        setstate(prev => ({
            ...prev,
            [isin]: { label: value, value: prev[isin].value, type: prev[isin].type }
        }))
    }


    return (
        <div className={classes.root}>
            <form className={classes.form} noValidate autoComplete="off">
                <Box>
                    <DatePicker label="تاریخ"
                        value={state.datetime.label ? state.datetime.label.split(" ")[0] : ""}
                    >
                        {
                            data => {
                                handleChange(`${dateMiladi(data)} 00:00:00.000000`, "datetime")
                            }
                        }
                    </DatePicker>
                </Box>

                <Box>
                    <DatePicker label="تاریخ تغییر نماد"
                        value={state.symbol_change_date.label ? state.symbol_change_date.label.toString() : ""}
                    >
                        {
                            data => {
                                handleChange(`${dateMiladi(data).replaceAll("/", '')}`, "symbol_change_date")
                            }
                        }
                    </DatePicker>
                </Box>

                <Box>
                    <DatePicker label="تاریخ اولین روز معاملاتی نماد"
                        value={state.symbol_first_trading_date.label ? state.symbol_first_trading_date.label.toString() : ""}
                    >
                        {
                            data => {
                                handleChange(`${dateMiladi(data).replaceAll("/", '')}`, "symbol_first_trading_date")
                            }
                        }
                    </DatePicker>
                </Box>
                {
                    Object.keys(state)
                        .filter(item => item !== "datetime" && item !== "symbol_change_date" && item !== "symbol_first_trading_date")
                        .map((item, ind) => (
                            <TextField
                                key={ind}
                                label={state[item].value}
                                value={state[item].label}
                                variant="outlined"
                                onChange={(e) => handleChange(e.target.value, item)}
                                type={state[item].type}
                            />
                        ))
                }


            </form>

            <div className={classes.buttons}>
                <button
                    className="btnsGreen"
                    onClick={handleSubmitInsertOrSubmit}
                >
                    ثبت
                </button>

                <button
                    className="btnsRed"
                    onClick={() => setNewButton(false)}
                >
                    کنسل
                </button>
            </div>
        </div>
    )
}


let initState = {
    "ins_code": { label: "", value: "شناسه Tse", type: "text" },
    "datetime": { label: "", value: "تاریخ", type: "text" },
    "5_char_latin_symbol": { label: "", value: "5کاراکتر لاتین نماد", type: "text" },
    "18_char_latin_symbol": { label: "", value: "18کاراکتر لاتین نماد", type: "text" },
    "5_char_latin_company_name": { label: "", value: "5کاراکتر لاتین نام شرکت", type: "text" },
    "30_char_persian_company_name": { label: "", value: "نام ۳۰ رقمی فارسی شرکت", type: "text" },
    "18_char_persian_symbol": { label: "", value: "نام مخفف نماد", type: "text" },
    "30_char_persian_symbol": { label: "", value: "نام کامل شرکت", type: "text" },
    "company_isin": { label: "", value: " شناسه شرکت", type: "text" },
    "nominal_price": { label: "", value: "قیمت اسمی", type: "number" },
    "total_company_quantity": { label: "", value: "تعداد سهام", type: "number" },
    "symbol_change_date": { label: "", value: "تاریخ تغییر نماد", type: "number" },
    "today_change_type": { label: "", value: "نوع تغییر امروز نماد", type: "text" },
    "symbol_category_aio": { label: "", value: "نوع نماد یکی از مقادیر aio", type: "text" },
    "symbol_group_code": { label: "", value: "کد گروه نماد", type: "text" },
    "symbol_first_trading_date": { label: "", value: "تاریخ اولین روز معاملاتی نماد", type: "number" },
    "price_scale": { label: "", value: "مقیاس قیمت", type: "number" },
    "market_category": { label: "", value: "دسته بندی بازار", type: "text" },
    "board_code": { label: "", value: "کد تابلو ", type: "number" },
    "sector_code": { label: "", value: "کد صنعت", type: "text" },
    "sub_sector_code": { label: "", value: "کد زیرگروه", type: "text" },
    "settlement_delay": { label: "", value: " تاخیر تسویه حساب", type: "number" },
    "max_permitted_price": { label: "", value: "حداکثر قیمت مجاز", type: "number" },
    "min_permitted_price": { label: "", value: "حداقل قیمت مجاز", type: "number" },
    "base_volume": { label: "", value: "حجم مبنا", type: "number" },
    "symbol_type": { label: "", value: "نوع نماد", type: "number" },
    "tick": { label: "", value: "تیک", type: "number" },
    "min_count": { label: "", value: "حدااقل تعداد", type: "number" },
    "flow": { label: "", value: "بازار", type: "number" },
    "max_permitted_volume": { label: "", value: "حداکثر حجم مجاز", type: "number" },
    "min_permitted_volume": { label: "", value: "حداقل حجم مجاز", type: "number" },
    "isin": { label: "", value: "شناسه نماد", type: "text" },
    "max_daily_index": { label: "", value: "بیشترین مقدار شاخص در طول روز", type: "number" },
    "last_daily_index_value": { label: "", value: "آخرین ارزش شاخص روزانه", type: "number" },
    "min_daily_index_value": { label: "", value: "کمترین ارزش شاخص روزانه", type: "number" },
    "index_value": { label: "", value: "مقدار شاخص بازده نقدي", type: "number" },
    "change_daily_index_value": { label: "", value: "تغییرات روزانه ارزش شاخص", type: "number" },
    "board": { label: "", value: "تابلو", type: "text" }
}

