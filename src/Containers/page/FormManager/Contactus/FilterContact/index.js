import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import DatePicker from "../../../../Common/Components/DatePicker/index";
import { dateConverttShamsiToMiladi } from "./../../../../Common/method/date/index";

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
                label={"نام و نام خانوادگی"}
                value={stateFilter.sender_full_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "sender_full_name")
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
                label={"تلفن همراه"}
                value={stateFilter.sender_phone}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "sender_phone")
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
                label={"ایمیل"}
                value={stateFilter.sender_email}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "sender_email")
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
                value={stateFilter.status}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "status")
                }
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value=""> همه </MenuItem>
                <MenuItem value="SUBMITTED">پاسخ داده نشده</MenuItem>
                <MenuItem value="ANSWERED">پاسخ داده شده</MenuItem>
              </TextField>
            </Box>
            <Box width={200} m={3}>
              <DatePicker label="از تاریخ">
                {(data) =>
                  handleChangeFilter(
                    data ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000` : null,
                    "submit_date_from"
                  )
                }
              </DatePicker>
            </Box>
            <Box width={200} m={3}>
              <DatePicker label="تا تاریخ">
                {(data) =>
                  handleChangeFilter(
                    data ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000` : null,
                    "submit_date_to"
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
