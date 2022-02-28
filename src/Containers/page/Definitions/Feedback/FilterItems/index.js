import React, { useState, useEffect } from "react";
import DatePicker from "./../../../../Common/Components/DatePicker";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import MenuItem from '@material-ui/core/MenuItem';

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
}));

export default function Index({
  flagFilter,
  handleFilter,
  handleChange,
  data,
  setData,
  apiCallSelect,
}) {
  const classes = useStyles();

  useEffect(() => {
    setData({ member_first_name: "", member_national_id: "" });
  }, [flagFilter]);

  const handleSubmit = () => {
    apiCallSelect(data);
  };

  return (
    <>
      {flagFilter ? (
        <div className={classes["filter"]}>
          <Box p={1}>
            <h3>فیلتر اطلاعات</h3>
          </Box>

          <Box display="flex">
            {/* <Box
                                    width={150}
                                    style={{ margin: "0 50px" }}
                                >
                                    <DatePicker label="تاریخ ثبت">
                                        {
                                            data => handleChange(data, "time")
                                        }

                                    </DatePicker>
                                </Box> */}

            <Box width={250} style={{ margin: "0 50px" }}>
              <TextField
                id="standard-select-currency"
                label={"نام"}
                value={data.member_first_name}
                onChange={(event) =>
                  handleChange(event.target.value, "member_first_name")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>
            <Box width={250} style={{ margin: "0 50px" }}>
              <TextField
                id="standard-select-currency"
                label={"نام خانوادگی"}
                value={data.member_last_name}
                onChange={(event) =>
                  handleChange(event.target.value, "member_last_name")
                }
                helperText=""
                size="small"
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </Box>

            <Box width={250} style={{ margin: "0 20px" }}>
              <TextField
                id="standard-select-currency"
                label={"جستجو کدملی"}
                value={data.member_national_id}
                onChange={(event) =>
                  handleChange(event.target.value, "member_national_id")
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
              <button onClick={handleSubmit} className="btnBlueFilter">
                بازخوانی{" "}
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
