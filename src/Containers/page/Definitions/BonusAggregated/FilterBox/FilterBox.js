import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import DatePickerEdit from "./../../../../Common/Components/DatePickerEditNew";

const useStyles = makeStyles((theme) => ({
  filter: {
    width: "96.5%",
    height: "auto",
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    padding: 30,
  },
  buttons: {
    textAlign: "right",
  },
}));

const FilterBox = ({
  flagFilter,
  stateFilter,
  handleChangeFilter,
  handelSubmitFilter,
}) => {
  const classes = useStyles();
  return (
    <>
      {flagFilter ? (
        <div className={classes["filter"]}>
          <Box p={1}>
            <h3>فیلتر اطلاعات</h3>
          </Box>
          <Box className={Styles["filter"]}>

            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                id="standard-select-currency"
                select
                label={"نوع"}
                value={stateFilter.type}
                onChange={(event) => handleChangeFilter(event.target.value, "is_removed")}
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""} > همه </MenuItem>
                <MenuItem value="TRUE">کسر شده</MenuItem>
                <MenuItem value="FALSE">اضافه شده</MenuItem>

              </TextField>
            </Box>

            <Box width={200} m={3}>
              <DatePickerEdit
                label="تاریخ انجام از"
                value={stateFilter.from_date_time}
                setValue={(data) => handleChangeFilter(data, "from_date_time")}
              />
            </Box>
            <Box width={200} m={3}>
              <DatePickerEdit
                label="تاریخ انجام تا"
                value={stateFilter.to_date_time}
                setValue={(data) => handleChangeFilter(data, "to_date_time")}
              />
            </Box>

          </Box>

          <Box p={2}>
            <div className={classes.buttons}>
              <button
                className="btnBlueFilter"
                onClick={() => handelSubmitFilter()}
              >
                بازخوانی
              </button>
            </div>
          </Box>
        </div>
      ) : null}
    </>
  );
};

export default FilterBox;
