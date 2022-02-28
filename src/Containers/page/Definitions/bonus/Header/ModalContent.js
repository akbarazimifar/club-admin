import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import { TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { bonus_v1_actions_add } from '../../../../../boot/api/Definitions/bonus/bounes_v1_add/action';
import { bonus_v1_actions_remove } from '../../../../../boot/api/Definitions/bonus/bounes_v1_remove/action';
import { data_m } from "./../../../../Common/method/date";
import { bonus_v1_actions_reserve } from '../../../../../boot/api/Definitions/bonus/bounes_v1_reserve/action';



const useStyles = makeStyles(() => ({
    root: {
        padding: 30
    },
    textField: {
        width: '35ch',
        [`& fieldset`]: {
            borderRadius: 20,
        },
    },
    buttons: {
        float: "right",
        marginTop: 30
    }

}))


export default function ModalCustom({ type, setFlagDeduction, setFlagAddPoint, setFlag, apiselectProfileEmpty, reducerProfile }) {

    const classes = useStyles();
    const dispatch = useDispatch()
    const [state, setstate] = useState({ national_id: "", value: "", source_description: "", internal_description: "" })


    useEffect(() => {
        return () => {
            setFlag({ status: false, type: "" })
            apiselectProfileEmpty()
        }
    }, [])

    useEffect(() => {
        if (reducerProfile[0]) {
            setstate(prev => ({ ...prev, national_id: reducerProfile[0].body.national_id }))
        }
    }, [reducerProfile])


    const handleChange = (data, type) => {
        setstate(prev => ({
            ...prev, [type]: data
        }))
    }

    const handleSubmitAdd = () => {
        let addedDate = {
            ...state,
            create_date: data_m()
        }
        dispatch(bonus_v1_actions_add(addedDate))
        setFlagAddPoint(false)
    }

    const handleSubmitReserve = () => {
        let addedDate = {
            ...state,
            create_date: data_m()
        }
        dispatch(bonus_v1_actions_reserve(addedDate))
        setFlagAddPoint(false)
    }


    const handleSubmitDeduction = () => {
        let addedDate = {
            ...state,
            create_date: data_m()
        }
        dispatch(bonus_v1_actions_remove(addedDate))
        setFlagDeduction(false)
    }


    return (
        <div className={classes.root}>

            <Box width={"100%"} style={{ margin: "5px", alignItems: 'center' }} display={'flex'} >
                <p style={{ marginLeft: 10 }}>نام و نام خانوادگی :</p>
                <p>
                    {
                        reducerProfile[0] && (
                            <>
                                {reducerProfile[0].body.first_name}
                                {' '}
                                {reducerProfile[0].body.last_name}
                            </>
                        )
                    }
                    {
                        !reducerProfile[0] && (
                            <>...</>
                        )

                    }

                </p>
            </Box>

            <Box display="flex" >
                <Box width={230} style={{ margin: "20px" }}>
                    <TextField
                        value={state.national_id}
                        // onChange={(e) => handleChange(e.target.value, "national_id")}
                        label="کدملی"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                    />
                </Box>

                <Box width={230} style={{ margin: "20px" }}>
                    <TextField
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value, "value")}
                        label="مقدار"
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="number"
                    />
                </Box>
            </Box>

            <Box width={500} style={{ margin: "10px 20px" }}>
                <TextField
                    value={state.source_description}
                    onChange={(e) => handleChange(e.target.value, "source_description")}
                    label="توضیحات کاربر"
                    variant="outlined"
                    size="small"
                    fullWidth
                    multiline
                />
            </Box>

            {
                (type === "ADD" || type === "DEDUCTION") && (
                    <Box width={500} style={{ margin: "20px" }}>
                        <TextField
                            value={state.internal_description}
                            onChange={(e) => handleChange(e.target.value, "internal_description")}
                            label="توضیحات ادمین"
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline
                        />
                    </Box>
                )
            }


            {
                type === "ADD" && (
                    <Box className={classes.buttons}>
                        <button className="btnsBlue" onClick={handleSubmitAdd}>افزودن امتیاز</button>
                        <button className="btnsRed" onClick={() => setFlagAddPoint(false)}>انصراف</button>
                    </Box>

                )
            }

            {
                type === "RESERVE" && (
                    <Box className={classes.buttons}>
                        <button className="btnsBlue" onClick={handleSubmitReserve}>رزرو امتیاز</button>
                        <button className="btnsRed" onClick={() => setFlagAddPoint(false)}>انصراف</button>
                    </Box>

                )
            }

            {
                type === "DEDUCTION" && (
                    <Box className={classes.buttons}>
                        <button className="btnsBlue" onClick={handleSubmitDeduction}>کسر امتیاز</button>
                        <button className="btnsRed" onClick={() => setFlagDeduction(false)}>انصراف</button>
                    </Box>

                )
            }


        </div>
    )
}
