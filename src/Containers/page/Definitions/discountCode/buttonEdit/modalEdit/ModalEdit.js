import React, { useEffect, useState } from "react";
import { Box, makeStyles, TextField } from "@material-ui/core";
import DatePickerEdit from "../../../../../Common/Components/DatePickerEdit";
import { dateConverttShamsiToMiladi } from "../../../../../Common/method/date";
import { useDispatch } from "react-redux";
import { discountCode_v1_update_action } from "../../../../../../boot/api/Definitions/gift/discountCode_v1_update/action";

const useStles = makeStyles(() => ({
  paper: {
    backgroundColor: "white",
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(4, 6, 3),
    // minWidth: "931px",
    padding: "50px",
    borderRadius: 10,
    width: "500px",
    maxWidth: "70%",
    display: "flex",
    justifyContent: "center",

    flexDirection: "column",
  },
}));
const ModalEdit = ({ data, setNewButton }) => {
  console.log("data", data);
  const classes = useStles();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    code: "",
    gift_title: "",
    expiration_date: "",
    _id: "",
  });
  useEffect(() => {
    setState((prev) => {
      return {
        ...prev,
        code: data.body.code,
        gift_title: data.body.gift_title,
        expiration_date: data.body.expiration_date,
        _id: data.id,
      };
    });
  }, [data]);

  const handleChange = (value, type) => {
    setState((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleClickEdit = () => {
    dispatch(discountCode_v1_update_action(state));
    setNewButton(false);
  };

  return (
    <>
      <Box className={classes.paper}>
        <h4>ویرایش</h4>
        <TextField
          label="کد تخفیف"
          id="titleNewButton"
          variant="outlined"
          value={state.code}
          style={{ margin: "20px 0", minWidth: "300px" }}
          onChange={(e) => handleChange(e.target.value, "code")}
        />
        <TextField
          label="دسته بندی"
          id="titleNewButton"
          variant="outlined"
          style={{ margin: "20px 0", minWidth: "300px" }}
          onChange={(e) => handleChange(e.target.value, "gift_title")}
          value={state.gift_title}
        />
        <DatePickerEdit
          value={state.expiration_date}
          label="تاریخ انقضا"
          style={{ margin: "20px 0", minWidth: "300px" }}
        >
          {(data) =>
            handleChange(
              data ? `${dateConverttShamsiToMiladi(data)} 23:59:59.999999` : "",
              "expiration_date"
            )
          }
        </DatePickerEdit>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "50px",
          }}
        >
          <button className="btnsGreen" onClick={handleClickEdit}>
            ویرایش
          </button>
          <button className="btnsRed">لغو</button>
        </div>
      </Box>
    </>
  );
};

export default ModalEdit;
