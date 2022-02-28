import React, { useState, useEffect } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import { select_member_remain } from "../../../../../../boot/api/profile/stock/stock_remain/action";
import {sepratePriceFromComma } from "../../../../../Common/method/seprateNumberFromComma";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "35ch",
    [`& fieldset`]: {
      borderRadius: 20,
    },
  },
}));

export default function Index({
  handelShowFilterItems,
  apiCallClubMember,
  national_id,
  setNational_id,
  stateReducerClubMember,
  totall,
 
}) {
  const classes = useStyles();
  let dispatch = useDispatch();

  const [state, setstate] = useState({ fullName: "" });

  const dataReducer = useSelector(
    (state) => state.select_portfolio_remain_reducer
  );

  useEffect(() => {
    if (stateReducerClubMember.data[0]) {
      let firstName = stateReducerClubMember.data[0].body.first_name;
      let lastName = stateReducerClubMember.data[0].body.last_name;
      setstate((prev) => ({ ...prev, fullName: firstName + " " + lastName }));
    }
  }, [stateReducerClubMember.data]);

  let member_id = stateReducerClubMember.data[0]?.id;

  useEffect(() => {
    dispatch(select_member_remain(member_id));
  }, [member_id]);

  let remain = dataReducer.data.response?.data?.results
    ? dataReducer.data.response?.data?.results[0].body
    : null;

  const handel_submit = () => {
    if (national_id.length > 1) {
      apiCallClubMember(national_id);
    } else {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: "لطفا فیلد کد ملی را وارد نمایید",
          typeAlert: "info",
        },
      });
    }
  };

  const handleChange = (event) => {
    setNational_id(event.target.value);
  };


  return (
    <div className={Styles["header"]} style={{ width: "98%" }}>
      <Box borderRadius={20} ml={5} className={Styles["grid"]}>
        <FormControl
          size="small"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="standard-start-adornment">
            کد ملی را وارد نمایید
          </InputLabel>
          <OutlinedInput
            id="standard-start-adornment"
            type={"text"}
            value={national_id}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                  onClick={handel_submit}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            labelWidth={270}
          />
        </FormControl>
      </Box>
      <Box
        display="flex"
        style={{ width: "65%", justifyContent: "space-between" }}
      >
        <p>{state.fullName}</p>
        <p>قدرت خرید:{sepratePriceFromComma(remain?.account_balance)}</p>
        <p>مانده بلوکه شده:{sepratePriceFromComma(remain?.blocked_balance)}</p>
        <p>مجموع:{sepratePriceFromComma(remain?.real_balance)}</p>
        <p>ارزش پرتفوی: {sepratePriceFromComma(totall ? totall : " - ")}</p>
      </Box>

      <div className={Styles["icon"]}>
        <FilterListIcon
          className="disabledItems"
          onClick={() => {
            handelShowFilterItems();
          }}
        />
        <RefreshIcon onClick={handel_submit} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
}
