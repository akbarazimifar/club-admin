import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import DatePicker from './../../../../Common/Components/DatePicker';
import { dateConverttShamsiToMiladi } from "../../../../Common/method/date";


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
            
              <Box width={250} className={Styles["TextField"]}>
                <TextField
                  id="standard-select-name"
                  label={"نام"}
                  value={stateFilter.member_first_name}
                  onChange={(event) =>
                    handleChangeFilter(event.target.value, "member_first_name")
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
                  id="standard-select-lastname"
                  label={"نام خانوادگی"}
                  value={stateFilter.member_last_name}
                  onChange={(event) =>
                    handleChangeFilter(event.target.value, "member_last_name")
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
                  id="standard-select-nationalId"
                  label={"کد ملی"}
                  value={stateFilter.member_national_id}
                  onChange={(event) =>
                    handleChangeFilter(event.target.value, "member_national_id")
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
                  id="standard-select-bunus"
                  label={"عنوان جایزه"}
                  value={stateFilter.online_charge_name}
                  onChange={(event) =>
                    handleChangeFilter(event.target.value, "online_charge_name")
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
                  id="standard-select-id"
                  label={"مبلغ"}
                  value={stateFilter.automation_id}
                  onChange={(event) =>
                    handleChangeFilter(event.target.value, "online_charge_amount")
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
                  id="standard-select-id"
                  label={"امتیاز مورد نیاز"}
                  value={stateFilter.online_charge_required_bonus}
                  onChange={(event) =>
                    handleChangeFilter(event.target.value, "online_charge_required_bonus")
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
                  value={stateFilter.status}
                  onChange={(event) => handleChangeFilter(event.target.value, "status")}
                  size="small"
                  fullWidth
                  variant="outlined"
                  margin="dense"
                >
                  <MenuItem value=""> همه </MenuItem>
                  <MenuItem value="SUBMITTED">در انتظار</MenuItem>
                  <MenuItem value="REJECTED">لغو شده</MenuItem>
                  <MenuItem value="FINALIZED">نهایی شده</MenuItem>
                </TextField>
              </Box>
              <Box width={193} style={{ margin: "0 50px" }}>
                <DatePicker label="از تاریخ">
                  {(data) =>
                    handleChangeFilter(
                      data
                        ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                        : null,
                      "from_date"
                    )
                  }
                </DatePicker>
              </Box>
              <Box width={193} m={3}>
                <DatePicker label="تا تاریخ">
                  {(data) =>
                    handleChangeFilter(
                      data
                        ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000`
                        : null,
                      "to_date"
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
