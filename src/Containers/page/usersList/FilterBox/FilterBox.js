import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../Posts/FilterItems/index.module.scss";
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
                label={"نام"}
                value={stateFilter.first_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "first_name")
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
                value={stateFilter.last_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "last_name")
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
                label={"کد ملی"}
                value={stateFilter.national_id}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "national_id")
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
                label={"حداقل امتیاز"}
                value={stateFilter.available_bonus}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "available_bonus")
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
                id="standard-select-id"
                label={"کد معرفی"}
                value={stateFilter.ref_code}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "ref_code")
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
                id="standard-select-id"
                label={"موبایل"}
                value={stateFilter.phone}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "phone")
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
                id="standard-select-id"
                label={"ایمیل"}
                value={stateFilter.email}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "email")
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
                label={"نقش"}
                value={stateFilter.category}
                onChange={(event) => handleChangeFilter(event.target.value, "category")}
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value=""> همه </MenuItem>
                <MenuItem value="ADMIN">ادمین</MenuItem>
                <MenuItem value="OPERATOR">اپراتور</MenuItem>
                <MenuItem value="MEMBER">کاربر عادی</MenuItem>
              </TextField>
            </Box>
            <Box width={250} className={Styles["TextField"]}>
              <TextField
                id="standard-select-id"
                label={"کد شعبه"}
                value={stateFilter.introducing_branch_id}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "introducing_branch_id")
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
                id="standard-select-id"
                label={"شهر شعبه"}
                value={stateFilter.branch_city}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "branch_city")
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
                id="standard-select-id"
                label={"استان شعبه"}
                value={stateFilter.branch_province}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "branch_province")
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
