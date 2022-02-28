import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import Styles from "./index.module.scss";
import { typeGift } from "./../../../../../../../boot/api/Definitions/gift/gift_v1_select/reducer";
import { Autocomplete } from "@material-ui/lab";
import DatePicker from "./../../../../../../Common/Components/DatePicker";
import { dateConverttShamsiToMiladi } from "./../../../../../../Common/method/date";

export default function Index({
  flagFilter,
  callApiRegistration,
  stateFilterRegistration,
  setStateFilterRegistration,
  reducerActiveName,
  paginationRegistration,
  setPaginationRegistration,
}) {
  let itemsStatus = [
    { label: "همه", value: "" },
    { label: "درانتظار", value: "SUBMITTED" },
    { label: "نهایی شده", value: "FINALIZED" },
    { label: "لغو شده", value: "REJECTED" },
  ];

  const handelchange = (value, type) => {
    setStateFilterRegistration((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handelSubmit = () => {
    if (paginationRegistration !== 1) {
      setPaginationRegistration(1);
    } else {
      callApiRegistration();
    }
  };

  return (
    <>
      {flagFilter ? (
        <div className={Styles["filter"]}>
          <Box style={{ paddingRight: 20 }}>
            <h3>فیلتر اطلاعات</h3>
          </Box>
          <Box display="flex" style={{flexWrap:'wrap'}}>
            <Box width={150} style={{ margin: "0 20px" }}>
              <TextField
                id="standard-select-currency"
                label={"کدملی"}
                value={stateFilterRegistration.member_national_id}
                onChange={(event) =>
                  handelchange(event.target.value, "member_national_id")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={150} style={{ margin: "0 20px" }}>
              <TextField
                id="standard-select-currency"
                select
                label={"وضعیت"}
                value={stateFilterRegistration.status}
                onChange={(event) => handelchange(event.target.value, "status")}
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                {itemsStatus.map((items, index) => (
                  <MenuItem key={index} value={items.value}>
                    {" "}
                    {items.label}{" "}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box width={150} style={{ margin: "0 20px" }}>
              <TextField
                id="standard-select-currency"
                select
                label={"نوع جایزه"}
                value={stateFilterRegistration.gift_type}
                onChange={(event) =>
                  handelchange(event.target.value, "gift_type")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              >
                <MenuItem value={""}>همه</MenuItem>

                {typeGift.map((items, index) => (
                  <MenuItem key={index} value={items.value}>
                    {" "}
                    {items.name}{" "}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box width={250} style={{ margin: "0 20px" }}>
              <TextField
                id="standard-select-currency"
                label={"مانده امتیاز"}
                value={stateFilterRegistration.member_available_bonus}
                onChange={(event) =>
                  handelchange(event.target.value, "member_available_bonus")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Box>
            <Box width={250} style={{ margin: "0 20px" }}>
              <TextField
                id="standard-select-currency"
                label={"شناسه جایزه"}
                value={stateFilterRegistration.gift_id}
                onChange={(event) =>
                  handelchange(event.target.value, "gift_id")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              ></TextField>
            </Box>

            {reducerActiveName.length !== 0 && (
              <Box width={300} style={{ margin: "8px 20px 0" }}>
                <Autocomplete
                  id="gift-registration-name"
                  options={reducerActiveName}
                  autoComplete={false}
                  // classes={{
                  //     option: classes.option,
                  // }}
                  autoHighlight
                  getOptionLabel={(option) =>
                    option.body ? option.body.name : option
                  }
                  // renderOption={(option) => (
                  //     <React.Fragment>
                  //         <span >{option.body.name}</span>
                  //     </React.Fragment>
                  // )}
                  value={stateFilterRegistration.gift_name}
                  onChange={(event, val) =>
                    val
                      ? handelchange(val.body.name, "gift_name")
                      : handelchange("", "gift_name")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="نام جایزه"
                      variant="outlined"
                      size="small"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Box>
            )}
            <Box width={150} style={{ margin: "0 20px" }}>
              <TextField
                id="standard-select-currency"
                label={"کد رهگیری پستی"}
                value={stateFilterRegistration.postal_tracking_code}
                onChange={(event) =>
                  handelchange(event.target.value, "postal_tracking_code")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={150} style={{ margin: "0 20px" }}>
              <TextField
                id="standard-select-currency"
                label={"کد کالا"}
                value={stateFilterRegistration.gift_code}
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
            <Box width={150} style={{ margin: "0 20px" }} style={{direction:'initial'}}>
              <TextField
                id="standard-select-currency"
                label={"شماره سفارش"}
                value={stateFilterRegistration.basket_code}
                onChange={(event) =>
                  handelchange(event.target.value, "basket_code")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box width={200} m={3}>
              <DatePicker label="تاریخ ثبت از">
                {(data) =>
                  handelchange(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                      : null,
                    "registration_date_from"
                  )
                }
              </DatePicker>
            </Box>
            <Box width={200} m={3}>
              <DatePicker label="تاریخ ثبت تا">
                {(data) =>
                  handelchange(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000`
                      : null,
                    "registration_date_to"
                  )
                }
              </DatePicker>
            </Box>
            <Box width={200} m={3}>
              <DatePicker label="تاریخ بسته‌شدن از">
                {(data) =>
                  handelchange(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 00:00:00.000000`
                      : null,
                    "closing_date_from"
                  )
                }
              </DatePicker>
            </Box>
            <Box width={200} m={3}>
              <DatePicker label="تاریخ بسته‌شدن تا">
                {(data) =>
                  handelchange(
                    data
                      ? `${dateConverttShamsiToMiladi(data)} 23:59:59.000000`
                      : null,
                    "closing_date_to"
                  )
                }
              </DatePicker>
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
