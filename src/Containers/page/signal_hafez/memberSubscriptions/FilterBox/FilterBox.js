import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DatePicker from "./../../../../Common/Components/DatePicker";
import { dateConverttShamsiToMiladi } from "./../../../../Common/method/date";


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
            <Box display="flex">
              <Box width={250} className={Styles["TextField"]}>
                <TextField
                  id="standard-select-name"
                  label={"عنوان"}
                  value={stateFilter.subscription_title}
                  onChange={(event) =>
                    handleChangeFilter(event.target.value, "subscription_title")
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
                  id="standard-select-name"
                  label={"کدملی"}
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
                  id="standard-select-name"
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
            </Box>

            <Box display="flex">
              <Box width={250} className={Styles["TextField"]}>
                <DatePicker label="از تاریخ شروع" >
                {(data) =>
                    handleChangeFilter(
                      data
                        ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                        : null,
                      "start_date_from"
                    )
                  }
                </DatePicker>
              </Box>

              <Box width={250} className={Styles["TextField"]}>
                <DatePicker label="تا تاریخ شروع">
                {(data) =>
                    handleChangeFilter(
                      data
                        ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000`
                        : null,
                      "start_date_to"
                    )
                  }
                </DatePicker>
              </Box>

              <Box width={250} className={Styles["TextField"]}>
                <DatePicker label="از تاریخ پایان">
                {(data) =>
                    handleChangeFilter(
                      data
                        ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                        : null,
                      "end_date_from"
                    )
                  }
                </DatePicker>
              </Box>

              <Box width={250} className={Styles["TextField"]}>
                <DatePicker label="تا تاریخ پایان" >
                {(data) =>
                    handleChangeFilter(
                      data
                        ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000`
                        : null,
                      "end_date_to"
                    )
                  }
                </DatePicker>
              </Box>
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
