import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import DatePickerEdit from "./../../../../../Common/Components/DatePickerEdit";
import { dateMiladi } from "./../../../../../Common/method/date";

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
  handelFilterReducer
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
            <Box width={200} m={3} >
              <TextField
                label="نام و نام خانوادگی"
                value={stateFilter['نام و نام خانوادگی']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'نام و نام خانوادگی')}
              />
            </Box>
            <Box width={200} m={3}>
              <TextField
                label="کد ملی"
                value={stateFilter['کد ملی']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'کد ملی')}
              />
            </Box>
            <Box width={200} m={3}>
              <TextField
                label="کد تفصیلی"
                value={stateFilter['کد تفصیلی']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'کد تفصیلی')}
              />
            </Box>

            <Box width={200} m={3}>
              <TextField
                select
                label={"وضعیت"}
                value={stateFilter['وضعیت']}
                onChange={(event) => handleChangeFilter(event.target.value, "وضعیت")}
                size="small"
                fullWidth
                variant="outlined"
                style={{ margin: "15px 0 35px 0" }}
              >
                <MenuItem value="تایید شده">تایید شده</MenuItem>
                <MenuItem value="در انتظار">در انتظار</MenuItem>
                <MenuItem value=""> همه </MenuItem>
              </TextField>
            </Box>

            <Box width={200} m={3}>
              <TextField
                label="حداقل امتیاز"
                value={stateFilter['کوچکترین مجموع امتیاز']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'کوچکترین مجموع امتیاز')}
              />
            </Box>
            <Box width={200} m={3}>
              <TextField
                label='حداکثر امتیاز'
                value={stateFilter['بزرگترین مجموع امتیاز']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'بزرگترین مجموع امتیاز')}
              />
            </Box>

          </Box>

          <Box p={2}>
            <div className={classes.buttons}>
              <button
                className="btnBlueFilter"
                onClick={() => handelFilterReducer()}
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
