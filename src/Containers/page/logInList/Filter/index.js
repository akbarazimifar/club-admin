import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../Filter/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from '../../../Common/Components/DatePicker'
import { dateMiladi } from "../../../Common/method/date";

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
            {/* <Box width={193} style={{ margin: "0 50px" }} >
                                    <DatePicker label="تاریخ ثبت">
                                        {
                                            data => handleChange(data, "create_date")
                                        }
                                    </DatePicker>
                                </Box> */}
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
                id="standard-select-lastname"
                label={"نام کاربری"}
                value={stateFilter.member_username}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_username")
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
                label={"شماره موبایل"}
                value={stateFilter.member_phone}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_phone")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} className={Styles["TextField"]}>

              <DatePicker label={'از تاریخ'}>
                {(date) => {
                  // handleChangeFilter(`${dateMiladi(date)} ${"00:00:00.000000"}`, 'from_date');
                  handleChangeFilter(date,'from_date');
                }}
              </DatePicker>
              <div style={{height:10,width:10}}></div>
              <DatePicker label={'تا تاریخ'}>
                {(date) => {
                  handleChangeFilter(`${dateMiladi(date)} ${"00:00:00.000000"}`, 'to_date');
                  handleChangeFilter(date, 'to_date');
                }}
              </DatePicker>
              {/* <TextField
                id="standard-select-id"
                label={"از تاریخ"}
                value={stateFilter.login_date}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "login_date")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              /> */}
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-bunus"
                label={"شناسه اتوماسیون"}
                value={stateFilter.member_automation_id}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_automation_id")
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
                label={"کد بورس"}
                value={stateFilter.member_bourse_code}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_bourse_code")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
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