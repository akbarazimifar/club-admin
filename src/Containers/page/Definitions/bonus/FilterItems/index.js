import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import DatePickerEdit from "./../../../../Common/Components/DatePickerEditNew";

const useStyles = makeStyles((theme) => ({
  filter: {
    width: "96.5%",
    height: "auto",
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
  },
  buttons: {
    textAlign: "right",
  },
  margin: {
    margin: theme.spacing(1),
  },
  fullname: {
    fontSize: "1.1em",
    fontWeight: "bold",
  },
  inputs: {
    width: "100%",
    marginLeft: 20,
  },
}));

export default function Index({
  flagFilter,
  stateFilter,
  handleChangeFilter,
  apiSubmitSelect,
  apiSubmitRequest,
  valueTab,
}) {
  const classes = useStyles();

  const bonus_type = [
    { name: "اضافه شده", value: "ADD" },
    { name: "خرج شده", value: "REMOVE" },
  ];

  const Bonus_status = [
    { name: "رزرو شده", value: "RESERVED" },
    { name: "لغو شده", value: "REJECTED" },
    { name: "نهایی شده", value: "FINALIZED" },
  ];

  const handleSubmit = () => {
    if (+valueTab === 0) apiSubmitSelect();
    if (+valueTab === 1) apiSubmitRequest();
  };

  return (
    <>
      {flagFilter ? (
        <div className={classes["filter"]}>
          <Box p={1}>
            <h3>فیلتر اطلاعات</h3>
          </Box>
          <Box
            display="flex"
            style={{ flexWrap: "wrap", alignItems: "center" }}
          >
            {valueTab === 0 && (
              <>
                <Box width={230} style={{ margin: "0 50px 0 0" }}>
                  <TextField
                    value={stateFilter.national_id}
                    onChange={(e) =>
                      handleChangeFilter(e.target.value, "national_id")
                    }
                    label="کدملی"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Box>

                <Box width={230} style={{ margin: "0 10px 0 0" }}>
                  <TextField
                    value={stateFilter.member_reserved_bonus}
                    onChange={(e) =>
                      handleChangeFilter(
                        e.target.value,
                        "member_reserved_bonus"
                      )
                    }
                    label="امتیاز رزرو شده"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Box>
                <Box width={230} style={{ margin: "0 10px 0 0" }}>
                  <TextField
                    value={stateFilter.member_account_code}
                    onChange={(e) =>
                      handleChangeFilter(e.target.value, "member_account_code")
                    }
                    label="کد تفصیلی"
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </Box>
              </>
            )}

            <Box width={230} style={{ margin: "0 -10px 0 0" }}>
              <TextField
                className={classes["inputs"]}
                id="standard-select-currency"
                select
                label={"نوع"}
                onChange={() => {
                  console.log("");
                }}
                helperText=""
                size="small"
                variant="outlined"
                value={stateFilter.bonus_type}
              >
                {bonus_type.map((item, ind) => (
                  <MenuItem
                    key={ind}
                    value={item.value}
                    onClick={() => {
                      handleChangeFilter(item.value, "bonus_type");
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
                <MenuItem
                  value={null}
                  onClick={() => {
                    handleChangeFilter("", "bonus_type");
                  }}
                >
                  همه
                </MenuItem>
              </TextField>
            </Box>
            <Box width={230} style={{ margin: "0 10px 0 10px" }}>
              <TextField
                className={classes["inputs"]}
                id="standard-select-currency"
                select
                label={"وضعیت"}
                onChange={() => {
                  console.log("");
                }}
                helperText=""
                size="small"
                variant="outlined"
                value={stateFilter.status}
              >
                {Bonus_status.map((item, ind) => (
                  <MenuItem
                    key={ind}
                    value={item.value}
                    onClick={() => {
                      handleChangeFilter(item.value, "status");
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
                <MenuItem
                  value={null}
                  onClick={() => {
                    handleChangeFilter("", "status");
                  }}
                >
                  همه
                </MenuItem>
              </TextField>
            </Box>
            <Box width={230} style={{ margin: "0 20px 0 0" }}>
              <TextField
                value={stateFilter.min_value}
                onChange={(e) =>
                  handleChangeFilter(e.target.value, "min_value")
                }
                label="حداقل مقدار"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
            <Box width={230} style={{ margin: "0 10px 0 0" }}>
              <TextField
                value={stateFilter.max_value}
                onChange={(e) =>
                  handleChangeFilter(e.target.value, "max_value")
                }
                label="حداکثر مقدار"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>

            <Box width={200} m={3}>
              <DatePickerEdit
                label="از تاریخ ایجاد"
                value={stateFilter.create_date_from}
                setValue={(data) => handleChangeFilter(data, "create_date_from")}
              />
            </Box>

            <Box width={200} m={3}>
              <DatePickerEdit
                label="تا تاریخ ایجاد"
                value={stateFilter.create_date_to}
                setValue={(data) => handleChangeFilter(data, "create_date_to")}
              />
            </Box>
            <Box width={200} m={3}>
              <DatePickerEdit
                label="از تاریخ اعمال"
                value={stateFilter.closing_date_from}
                setValue={(data) => handleChangeFilter(data, "closing_date_from")}
              />
            </Box>
            <Box width={200} m={3}>
              <DatePickerEdit
                label="تا تاریخ اعمال"
                value={stateFilter.closing_date_to}
                setValue={(data) => handleChangeFilter(data, "closing_date_to")}
              />
            </Box>
          </Box>

          <Box p={2}>
            <div className={classes.buttons}>
              <button className="btnBlueFilter" onClick={handleSubmit}>
                بازخوانی
              </button>
            </div>
          </Box>
        </div>
      ) : (
          ""
        )}
    </>
  );
}
