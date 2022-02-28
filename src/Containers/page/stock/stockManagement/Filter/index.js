import React from "react";
import Box from "@material-ui/core/Box";
import Styles from "../../../Posts/FilterItems/index.module.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import SearchSymbol from './../../../../Common/Components/SearchSymbol/index';


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
  dataReducer
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

            <Box width={250} mx={3}>
             
              <SearchSymbol
                 value={stateFilter.short_name}
                 setValue={(data)=>  handleChangeFilter(data.short_name, "short_name")}/>
            </Box>

            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"شناسه سهم"}
                value={stateFilter.isin}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "isin")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"شناسه اتوماسیون"}
                value={stateFilter.back_office_id}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "back_office_id")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"نام کامل"}
                value={stateFilter.full_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "full_name")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"کد صنعت"}
                value={stateFilter.sector_code}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "sector_code")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"نام صنعت"}
                value={stateFilter.sector_name}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "sector_name")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"کد زیرگروه"}
                value={stateFilter.sub_sector_code}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "sub_sector_code")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"بازار"}
                value={stateFilter.flow}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "flow")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"نمایش"}
                value={stateFilter.is_active}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "is_active")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                select
              >
                <MenuItem value={""}>همه</MenuItem>
                <MenuItem value={"TRUE"}>فعال</MenuItem>
                <MenuItem value={"FALSE"}>غیرفعال</MenuItem>
              </TextField>
            </Box>

            <Box width={150} mx={3}>
              <TextField
                id="standard-select-name"
                label={"نوع سهام"}
                value={stateFilter.stock_type}
                onChange={(event) =>
                  handleChangeFilter(event.target.value, "stock_type")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
                select
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
