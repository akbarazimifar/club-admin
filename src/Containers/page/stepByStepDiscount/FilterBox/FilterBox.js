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
                id="standard-select-lastname"
                label={"نام"}
                value={stateFilter["member_first_name"]}
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
                value={stateFilter["member_last_name"]}
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
                label={"کد ملی"}
                value={stateFilter["member_national_id"]}
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
                id="standard-select-currency"
                select
                label={"نوع سهام"}
                value={stateFilter["instrument_type"]}
                onChange={(event) => handleChangeFilter(event.target.value, "instrument_type")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""}>همه</MenuItem>
                <MenuItem value={"MORTGAGE"}>تسهیلات مسکن</MenuItem>
                <MenuItem value={"ETF"}>صندوق قابل معامله</MenuItem>
                <MenuItem value={"BOND"}>اوراق قرضه</MenuItem>
                <MenuItem value={"OPTION"}>اختیار</MenuItem>
                <MenuItem value={"IFB"}>فرابورس</MenuItem>
                <MenuItem value={"TSE"}>بورس</MenuItem>
                <MenuItem value={"FUTURE"}>آتی</MenuItem>
                <MenuItem value={"ENERGY"}>انرژی</MenuItem>
                <MenuItem value={"IME"}>کالا</MenuItem>
              </TextField>
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                select
                label={"آنلاین"}
                value={stateFilter["is_online"]}
                onChange={(event) => handleChangeFilter(event.target.value, "is_online")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""}>همه</MenuItem>
                <MenuItem value={"True"}>باشد</MenuItem>
                <MenuItem value={"False"}>نباشد</MenuItem>
              </TextField>
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-currency"
                select
                label={"وضعیت"}
                value={stateFilter["state"]}
                onChange={(event) => handleChangeFilter(event.target.value, "state")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""}>همه</MenuItem>
                <MenuItem value={"NOT_PROCESSED"}>در انتظار</MenuItem>
                <MenuItem value={"FINALIZED"}>ثبت شده</MenuItem>
                <MenuItem value={"REJECTED"}>رد شده</MenuItem>
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
