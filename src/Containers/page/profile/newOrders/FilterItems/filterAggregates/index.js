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
    stateFilterAggregates,
    handelchangeStateFilterAggregates,
}) {

    const classes = useStyles();

    return (
        <>
            <Box className={classes["grid"]}>
                <Box display="flex" style={{ flexWrap: 'wrap' }}>
                    {/* <Box width={150} style={{ margin: "0 50px" }}>
                <DatePicker label="از تاریخ ثبت">
                  {(data) => handelchangeStateFilterAggregates(data, "time")}
                </DatePicker>
              </Box> */}

                    <Box width={200} style={{ margin: "0 50px 0px 5px" }}>
                        <TextField
                            id="standard-select-currency"
                            select
                            label={"نوع درخواست"}
                            value={stateFilterAggregates.trade_type}
                            size="small"
                            fullWidth
                            variant="outlined"
                            margin="dense"
                        >
                            <MenuItem value={"خرید"} onClick={() => handelchangeStateFilterAggregates("1", "trade_type")}>خرید</MenuItem>
                            <MenuItem value={"فروش"} onClick={() => handelchangeStateFilterAggregates("2", "trade_type")}>فروش</MenuItem>
                            <MenuItem value={""} onClick={() => handelchangeStateFilterAggregates(null, "trade_type")}>همه</MenuItem>
                        </TextField>
                    </Box>
                    <Box width={200} style={{ margin: "8px 5px" }} >
                        <SearchSymbol
                            value={stateFilterAggregates.isin}
                            setValue={(data) => handelchangeStateFilterAggregates(data.isin ? data.isin : data.short_name, "isin")} />
                    </Box>
                    <Box width={200} style={{ margin: "0px 5px" }} >
                        <TextField
                            id="standard-select-nationalId"
                            label={"مقدار"}
                            value={stateFilterAggregates.total_value}
                            onChange={(event) => handelchangeStateFilterAggregates(event.target.value, "total_value")}
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
                            value={stateFilterAggregates.average_price}
                            onChange={(event) => handelchangeStateFilterAggregates(event.target.value, "average_price")}
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
                            value={stateFilterAggregates.quantity}
                            onChange={(event) => handelchangeStateFilterAggregates(event.target.value, "quantity")}
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
                            label={"نماد"}
                            value={stateFilterAggregates.instrument_type}
                            onChange={(event) => handelchangeStateFilterAggregates(event.target.value, "instrument_type")}
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
