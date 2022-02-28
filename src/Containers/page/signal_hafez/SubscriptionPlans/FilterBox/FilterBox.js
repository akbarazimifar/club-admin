import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";


const useStyles = makeStyles(() => ({
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
                label={"مدت زمان اشتراک"}
                value={stateFilter.duration}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "duration")
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
                label={"امتیاز لازم"}
                value={stateFilter.required_bonus}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "required_bonus")
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
                value={stateFilter.is_active}
                onChange={(event) => handleChangeFilter(event.target.value, "is_active")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value=""> همه </MenuItem>
                <MenuItem value="TRUE">فعال</MenuItem>
                <MenuItem value="FALSE">غیر فعال</MenuItem>
              </TextField>
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
