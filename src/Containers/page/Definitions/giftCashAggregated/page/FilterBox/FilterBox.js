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
            <Box width={200} m={1} >
              <TextField
                label="نام"
                value={stateFilter['member_first_name']}
                variant="outlined"   
                
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'member_first_name')}
              />
            </Box>
            <Box width={200} m={1} >
              <TextField
                label="نام خانوادگی"
                value={stateFilter['member_last_name']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'member_last_name')}
              />
            </Box>
            <Box width={200} m={1}>
              <TextField
                label="کد ملی"
                value={stateFilter['member_national_id']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'member_national_id')}
              />
            </Box>
            <Box width={200} m={1}>
              <TextField
                label="کد تفصیلی"
                value={stateFilter['member_account_code']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'member_account_code')}
              />
            </Box>
            <Box width={200} m={1}>
              <TextField
                label="حداقل امتیاز"
                value={stateFilter['min_sum_bonus']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'min_sum_bonus')}
              />
            </Box>
            <Box width={200} m={1}>
              <TextField
                label='حداکثر امتیاز'
                value={stateFilter['max_sum_bonus']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'max_sum_bonus')}
              />
            </Box>
            <Box width={200} m={1}>
              <TextField
                label="حداقل مبلغ"
                value={stateFilter['min_sum_amount']}
                variant="outlined"
                size="small"
                style={{ margin: "15px 0 35px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'min_sum_amount')}
              />
            </Box>
            <Box width={200} m={1}>
              <TextField
                label='حداکثر مبلغ'
                value={stateFilter['max_sum_amount']}
                variant="outlined"
                size="small"
                style={{ margin: "0  px 0 0px 0" }}
                onChange={(event) => handleChangeFilter(event.target.value,'max_sum_amount')}
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
