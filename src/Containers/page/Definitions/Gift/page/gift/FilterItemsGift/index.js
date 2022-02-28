import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Styles from "./index.module.scss";
import { typeGift } from "../../../../../../../boot/api/Definitions/gift/gift_v1_select/reducer";

export default function Index({
  flagFilter,
  apiGiftFilter,
  stateFilter,
  setstateFilter,
  reducerCategories,
  reducerSubcategories,
  setpaginationGift,
  paginationGift,
}) {
  const handelchange = (value, type) => {
    setstateFilter((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handelSubmit = () => {
    if (paginationGift !== 1) {
      setpaginationGift(1);
    } else {
      apiGiftFilter();
    }
  };

  if (!reducerCategories.length && !reducerSubcategories.length) {
    return flagFilter && <div className={Styles["filter"]}></div>;
  }

  return (
    <>
      {flagFilter ? (
        <div className={Styles["filter"]}>
          <Box style={{ paddingRight: 20 }}>
            <h3>فیلتر اطلاعات</h3>
          </Box>
          <Box display="flex">
            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                id="standard-select-currency"
                select
                label={"گروه"}
                value={stateFilter.gift_category}
                onChange={(event) => handelchange(event.target.value, "gift_category")}
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""}> همه </MenuItem>
                {reducerCategories.map((value, index) => {
                  return (
                    <MenuItem value={value.body.gift_category} key={index}>
                      {" "}
                      {value.body.gift_category}{" "}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>

            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                id="standard-select-currency"
                select
                label={"زیر گروه"}
                value={stateFilter.gift_sub_category}
                onChange={(event) =>
                  handelchange(event.target.value, "gift_sub_category")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""}> همه </MenuItem>

                {reducerSubcategories.map((value, index) => {
                  return (
                    <MenuItem
                      dense={true}
                      className="ellipsis"
                      style={{ maxWidth: "" }}
                      value={value.body.gift_sub_category}
                      key={index}
                    >
                      {" "}
                      {value.body.gift_sub_category}{" "}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>

            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                id="standard-select-currency"
                select
                label={"نوع"}
                value={stateFilter.type}
                onChange={(event) => handelchange(event.target.value, "type")}
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""}> همه </MenuItem>

                {typeGift.map((item, ind) => (
                  <MenuItem key={ind} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                id="standard-select-currency"
                select
                label={"وضعیت"}
                value={stateFilter.is_active}
                onChange={(event) =>
                  handelchange(event.target.value, "is_active")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""}> همه </MenuItem>
                <MenuItem dense={true} value="TRUE">
                  فعال
                </MenuItem>
                <MenuItem dense={true} value="FALSE">
                  غیر فعال
                </MenuItem>
              </TextField>
            </Box>

            <Box width={200} style={{ margin: "0 40px" }}>
              <TextField
                id="standard-select-currency"
                label={"کد کالا"}
                value={stateFilter.gift_code}
                onChange={(event) =>
                  handelchange(event.target.value, "gift_code")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

          </Box>
          <div className={Styles["btns"]}>
            <button
              className={Styles["btnsBlack"]}
              onClick={() => handelSubmit()}
            >
              بازخوانی{" "}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
