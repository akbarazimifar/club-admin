import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
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
                label={"متوسط گردش ماهیانه"}
                value={stateFilter.monthly_turnover}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "monthly_turnover")
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
                label={"مدت زمان فعالیت در بازار سرمایه"}
                value={stateFilter.duration_activity}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "duration_activity")
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
                label={"دلیل درخواست شعبه"}
                value={stateFilter.request_reasons}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "request_reasons")
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
                label={"سوابق مدیریتی "}
                value={stateFilter.management_experiences}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "management_experiences")
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
