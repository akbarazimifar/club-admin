import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import DatePicker from "./../../../../Common/Components/DatePicker";
import { dateConverttShamsiToMiladi } from "./../../../../Common/method/date";


const useStyles = makeStyles(() => ({
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
            
              <Box width={250} className={Styles["TextField"]}>
                <TextField
                  id="standard-select-name"
                  label={"عنوان"}
                  value={stateFilter.title}
                  onChange={(event) =>
                    handleChangeFilter(event.target.value, "title")
                  }
                  helperText=""
                  size="small"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                />
              </Box>
              

              <Box width={250} className={Styles["TextField"]}>
                <TextField
                  id="standard-select-currency"
                  select
                  label={"وضعیت"}
                  value={stateFilter.is_active}
                  onChange={(event) => handleChangeFilter(event.target.value, "is_active")}
                  size="small"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                >
                  <MenuItem value=""> همه </MenuItem>
                  <MenuItem value="TRUE">فعال</MenuItem>
                  <MenuItem value="FALSE">غیر فعال</MenuItem>
                </TextField>
              </Box>

              <Box width={250} className={Styles["TextField"]}>
                <DatePicker label="از تاریخ ثبت" >
                {(data) =>
                    handleChangeFilter(
                      data
                        ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                        : null,
                      "insert_date_time_from"
                    )
                  }
                </DatePicker>
              </Box>

              <Box width={250} className={Styles["TextField"]}>
                <DatePicker label="تا تاریخ ثبت">
                {(data) =>
                    handleChangeFilter(
                      data
                        ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000`
                        : null,
                      "insert_date_time_to"
                    )
                  }
                </DatePicker>
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
