import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DatePicker from "../../../../Common/Components/DatePicker";
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
  },
  buttons: {
    textAlign: "right",
  },
}));

export default function Index({
  flagFilter,
  stateFilterPerson,
  handelChangeFilterPeson,
  handleSubmitFilterPerson,
}) {
  const classes = useStyles();

  return (
    <>
      {flagFilter ? (
        <div className={classes["filter"]}>
          <Box p={1}>
            <h3>فیلتر اطلاعات</h3>
          </Box>

          <Box display="flex" alignItems="center">
            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                id="outlined-basic"
                label={"کدملی"}
                variant="outlined"
                size="small"
                value={stateFilterPerson.member_national_id}
                onChange={(event) =>
                  handelChangeFilterPeson(
                    event.target.value,
                    "member_national_id"
                  )
                }
              />
            </Box>
            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                id="outlined-basic"
                label={"عنوان آموزش"}
                variant="outlined"
                size="small"
                value={stateFilterPerson.course_name}
                onChange={(event) =>
                  handelChangeFilterPeson(event.target.value, "course_name")
                }
              />
            </Box>

            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                style={{ marginTop: "0" }}
                id="standard-select-currency"
                select
                label={"وضعیت"}
                value={stateFilterPerson.status}
                onChange={(event) =>
                  handelChangeFilterPeson(event.target.value, "status")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value="SUBMITTED"> در انتظار </MenuItem>
                <MenuItem value="CANCELED">لغو شده</MenuItem>
                <MenuItem value="FINALIZED">نهایی شده</MenuItem>
              </TextField>
            </Box>
            <Box width={200} style={{ margin: "0 40px" }}>
              <DatePicker label="از تاریخ ثبت نام">
                {(data) =>
                  handelChangeFilterPeson(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                      : null,
                    "registration_date_from"
                  )
                }
              </DatePicker>
            </Box>

            <Box width={200} style={{ margin: "0 40px" }}>
              <DatePicker label="تا تاریخ ثبت نام">
                {(data) =>
                  handelChangeFilterPeson(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000`
                      : null,
                    "registration_date_to"
                  )
                }
              </DatePicker>
            </Box>
          </Box>

          <Box p={2}>
            <div className={classes.buttons}>
              <button
                className="btnBlueFilter"
                onClick={handleSubmitFilterPerson}
              >
                بازخوانی{" "}
              </button>
            </div>
          </Box>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
