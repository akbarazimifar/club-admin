import React, { useState } from 'react'
import DatePicker from "./../../../../../Common/Components/DatePicker";
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    filter: {
        width: "96.5%",
        height: "auto",
        backgroundColor: "white",
        margin: 'auto',
        marginTop: '-10px',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        borderRadius: '5px',
    },
    buttons: {
        textAlign: "right"
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '35ch',
        [`& fieldset`]: {
            borderRadius: 20,
        },
    },

}))


export default function Index({ flagFilter }) {
    const classes = useStyles();
    const [data, setData] = useState({ time: "" }) //eslint-disable-line no-unused-vars


    const handleChangeDate = (data, type) => {
        setData(prev => ({ ...prev, [type]: data }))
    }



    return (
        <>
            {
                flagFilter
                    ? (
                        <div className={classes['filter']} >
                            <Box p={1} >
                                <h3>فیلتر اطلاعات</h3>
                            </Box>
                            <Box display="flex" >
                                <Box width={150} style={{ margin: "0 50px" }}>
                                    <DatePicker label="تاریخ">
                                        {
                                            data => handleChangeDate(data, "time")
                                        }
                                    </DatePicker>
                                </Box>
                            </Box>

                            <Box p={2}>
                                <div className={classes.buttons}>
                                    <button
                                        className="btnBlueFilter"
                                    >بازخوانی</button>
                                </div>
                            </Box>
                        </div>
                    )
                    : ''
            }
        </>
    )
}

