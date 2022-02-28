import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from './../../../../Common/Components/DatePicker';
import { dateConverttShamsiToMiladi } from './../../../../Common/method/date';
import { MenuItem } from "@material-ui/core";


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
                id="standard-select-bunus"
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
            <Box width={250}  className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                select
                label={"شماره پایانه"}
                value={stateFilter.terminal_id}
                onChange={(event) => handleChangeFilter(event.target.value, "terminal_id")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value=""> همه </MenuItem>
                <MenuItem value="1">به پرداخت بانک ملت</MenuItem>
                <MenuItem value="2">ایران کیش</MenuItem>
                <MenuItem value="3">بانک سامان</MenuItem>

              </TextField>
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-bunus"
                label={"کد تفضیلی"}
                value={stateFilter.member_account_code}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "member_account_code")
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
                label={"شناسه تراکنش"}
                value={stateFilter.payment_id}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "payment_id")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250}  className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                select
                label={"بازگشت از بانک"}
                value={stateFilter.returned_from_bank}
                onChange={(event) => handleChangeFilter(event.target.value, "returned_from_bank")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value=""> همه </MenuItem>
                <MenuItem value="TRUE">دارد</MenuItem>
                <MenuItem value="FALSE">ندارد</MenuItem>

              </TextField>
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-bunus"
                label={"نتیجه بازگشتی"}
                value={stateFilter.returned_result}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "returned_result")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            {/* <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-bunus"
                label={"توضیحات"}
                value={stateFilter.returned_description}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "returned_description")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box> */}
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-bunus"
                label={"مبلغ"}
                value={stateFilter.amount}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "amount")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250}  className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                select
                label={"تایید تراکنش"}
                value={stateFilter.is_verified}
                onChange={(event) => handleChangeFilter(event.target.value, "is_verified")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value=""> همه </MenuItem>
                <MenuItem value="TRUE">تایید شده</MenuItem>
                <MenuItem value="FALSE">تایید نشده</MenuItem>

              </TextField>
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-bunus"
                label={"وضعیت"}
                value={stateFilter.club_state}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "club_state")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={193} style={{ margin: "10px 25px" }} >
              <DatePicker label="از تاریخ تایید تراکنش">
                {
                  data => handleChangeFilter(data ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000` : '', "from_verification_date")
                }
              </DatePicker>
            </Box>
            <Box width={193} style={{ margin: "10px 25px" }} >
              <DatePicker label=" تا تاریخ تایید تراکنش">
                {
                  data => handleChangeFilter(data ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000` : '', "to_verification_date")
                }
              </DatePicker>
            </Box>
            <Box width={193} style={{ margin: "10px 25px" }} >
              <DatePicker label=" از تاریخ درخواست">
                {
                  data => handleChangeFilter(data ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000` : '', "from_request_date")
                }
              </DatePicker>
            </Box>
            <Box width={193} style={{ margin: "10px 25px" }} >
              <DatePicker label=" تا تاریخ درخواست">
                {
                  data => handleChangeFilter(data ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000` : '', "to_request_date")
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
