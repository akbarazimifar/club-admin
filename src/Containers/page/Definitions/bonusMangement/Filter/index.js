import React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import DatePickerEdit from '../../../../Common/Components/DatePickerEditNew';

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
                label={"جمع امتیازات"}
                value={stateFilter.bonus_value}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "bonus_value")
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
                label={"معادل ریالی امتیازات"}
                value={stateFilter.rial_equivalent}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "rial_equivalent")
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
                label={"نسبت"}
                value={stateFilter.ratio}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "ratio")
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
                id="standard-select-name"
                label={"کارمزد"}
                value={stateFilter.total_commission}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "total_commission")
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
                id="standard-select-name"
                label={"حداقل کارمزد"}
                value={stateFilter.from_total_commission}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "from_total_commission")
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
                label={"حداکثر کارمزد"}
                value={stateFilter.to_total_commission}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "to_total_commission")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={193} style={{ margin: "10px 25px" }} >
              <DatePickerEdit
                label="از تاریخ"
                value={stateFilter.from_date_time}
                setValue={(data) => handleChangeFilter(data, "from_date_time")}
              />
            </Box>
            <Box width={193} style={{ margin: "10px 25px" }} >
              <DatePickerEdit
                label="تا تاریخ"
                value={stateFilter.to_date_time}
                setValue={(data) => handleChangeFilter(data, "to_date_time")}
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
