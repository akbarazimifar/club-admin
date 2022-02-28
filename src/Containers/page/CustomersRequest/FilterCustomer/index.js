import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../Posts/FilterItems/index.module.scss";
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
                id="standard-select-nationalId"
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
            <Box width={250}  className={Styles["TextField"]}>
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
                <MenuItem value="REJECTED">رد شده</MenuItem>
                <MenuItem value="REGISTERED">ثبت نام شده</MenuItem>
                <MenuItem value="FINALIZED">نهایی شده</MenuItem>
                <MenuItem value="NOT_PROCESSED">بررسی نشده</MenuItem>
              </TextField>
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
