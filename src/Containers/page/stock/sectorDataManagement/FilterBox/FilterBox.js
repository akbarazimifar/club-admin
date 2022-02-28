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
                label={"نام مخفف نماد"}
                value={stateFilter["18_char_persian_symbol"]}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "18_char_persian_symbol")
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
                label={"نام کامل شرکت"}
                value={stateFilter["30_char_persian_symbol"]}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "30_char_persian_symbol")
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
                label={"بازار"}
                value={stateFilter["flow"]}
                onChange={(event) => handleChangeFilter(event.target.value, "flow")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value=""> همه </MenuItem>
                <MenuItem value="1">بورس</MenuItem>
                <MenuItem value="2">فرابورس</MenuItem>
                <MenuItem value="4">پایه</MenuItem>
              </TextField>
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"ارزش کل"}
                value={stateFilter["حداکثر قیمت مجاز"]}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "max_permitted_price")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                type="number"
              />
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"حدااقل قیمت مجاز"}
                value={stateFilter["min_permitted_price"]}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "min_permitted_price")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                type="number"
              />
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"حجم مبنا"}
                value={stateFilter["base_volume"]}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "base_volume")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                type="number"
              />
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"کد گروه نماد"}
                value={stateFilter["symbol_group_code"]}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "symbol_group_code")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                type="number"
              />
            </Box>

            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-lastname"
                label={"کد گروه صنعت"}
                value={stateFilter["sector_code"]}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "sector_code")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                type="number"
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
