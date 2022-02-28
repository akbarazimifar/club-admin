import React from "react";
// import DatePicker from "./../../../../Common/Components/DatePicker";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import SearchSymbol from './../../../../../Common/Components/SearchSymbol';


const useStyles = makeStyles((theme) => ({
    filter: {
        width: "96.5%",
        height: "auto",
        backgroundColor: "white",
        margin: "auto",
        marginTop: "-5px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
    },
    buttons: {
        textAlign: "right",
        marginTop: 25,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    grid: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: 'wrap'
    },
}));


export default function Index({
    stateFilterDetalis,
    handelchangeStateFilterDetalis,
}) {


    const classes = useStyles();

    return (
        <>
            <Box className={classes["grid"]}>
                <Box display="flex" style={{ flexWrap: 'wrap' }}>
                    {/* <Box width={150} style={{ margin: "0 50px" }}>
                <DatePicker label="از تاریخ ثبت">
                  {(data) => handelchangeStateFilterDetalis(data, "time")}
                </DatePicker>
              </Box> */}
                    <Box width={200} style={{ margin: "0 50px 0px 5px" }}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label={"نوع درخواست"}
                            value={stateFilterDetalis.trade_type}
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        >
                            <MenuItem value={"خرید"} onClick={() => handelchangeStateFilterDetalis("1", "trade_type")}>خرید</MenuItem>
                            <MenuItem value={"فروش"} onClick={() => handelchangeStateFilterDetalis("2", "trade_type")}>فروش</MenuItem>
                            <MenuItem value={""} onClick={() => handelchangeStateFilterDetalis(null, "trade_type")}>همه</MenuItem>
                        </TextField>
                    </Box>
                    <Box width={200} style={{ margin: "0px 5px" }} >
                        <TextField
                            id="standard-select-currency"
                            select
                            label={"منبع درخواست"}
                            value={stateFilterDetalis.is_online}
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        >
                            <MenuItem value={"آنلاین"} onClick={() => handelchangeStateFilterDetalis("True", "is_online")}>آنلاین</MenuItem>
                            <MenuItem value={"آفلاین"} onClick={() => handelchangeStateFilterDetalis("False", "is_online")}>آفلاین</MenuItem>
                            <MenuItem value={""} onClick={() => handelchangeStateFilterDetalis(null, "is_online")}>همه</MenuItem>
                        </TextField>
                    </Box>

                    <Box width={200} style={{ margin: "0px 5px" }} >
                        <TextField
                            id="standard-select-currency"
                            select
                            label={"وضعیت درخواست"}
                            value={stateFilterDetalis.is_canceled}
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        >
                            <MenuItem value={"لغو شده"} onClick={() => handelchangeStateFilterDetalis("TRUE", "is_canceled")}>لغو شده</MenuItem>
                            <MenuItem value={"لغو نشده"} onClick={() => handelchangeStateFilterDetalis("FALSE", "is_canceled")}>لغو نشده</MenuItem>
                            <MenuItem value={""} onClick={() => handelchangeStateFilterDetalis(null, "is_canceled")}>همه</MenuItem>
                        </TextField>
                    </Box>
                    <Box width={200} style={{ margin: "8px 5px" }} >
                        <SearchSymbol
                            value={stateFilterDetalis.instrument_id}
                            setValue={(data) => handelchangeStateFilterDetalis(data.isin ? data.isin : data.short_name, "instrument_id")} />
                    </Box>
                    <Box width={200} style={{ margin: "0px 5px" }} >
                        <TextField
                            id="standard-select-nationalId"
                            label={"کد معاملاتی"}
                            value={stateFilterDetalis.account}
                            onChange={(event) => handelchangeStateFilterDetalis(event.target.value, "account")}
                            helperText=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Box>


                    <Box width={200} style={{ margin: "0px 5px" }} >
                        <TextField
                            id="standard-select-nationalId"
                            label={"قیمت "}
                            value={stateFilterDetalis.price}
                            onChange={(event) => handelchangeStateFilterDetalis(event.target.value, "price")}
                            helperText=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Box>
                    <Box width={200} style={{ margin: "0px 5px" }} >
                        <TextField
                            id="standard-select-nationalId"
                            label={"تعداد سهام"}
                            value={stateFilterDetalis.quantity}
                            onChange={(event) => handelchangeStateFilterDetalis(event.target.value, "quantity")}
                            helperText=""
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        />
                    </Box>

                </Box>

            </Box>

        </>
    );
}
