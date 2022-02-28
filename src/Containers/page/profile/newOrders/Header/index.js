import React, { useEffect } from "react";
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
import { useDispatch } from "react-redux";

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
  apiSelectProfile,
  state,
  handelchangeState,
  handleRefresh,
  stateReducerProfile,
  setMamber_id
}) {
  const classes = useStyles();
  let dispatch = useDispatch();


  useEffect(() => {

    if (stateReducerProfile.data[0]) {
      let firstName = stateReducerProfile.data[0].body.first_name
        ? stateReducerProfile.data[0].body.first_name
        : "";
      let lastName = stateReducerProfile.data[0].body.last_name
        ? stateReducerProfile.data[0].body.last_name
        : "";
      handelchangeState(firstName + " " + lastName, 'fullName')
    }

    if (stateReducerProfile.national_id) {
      handelchangeState(
        stateReducerProfile.national_id
          ? stateReducerProfile.national_id
          : ""
        , 'national_id')
    }
  }, [stateReducerProfile.data, stateReducerProfile.national_id]); //eslint-disable-line  react-hooks/exhaustive-deps


  useEffect(() => {
    if (stateReducerProfile.data.length > 0) {
      let member_id = stateReducerProfile.data[0].id;
      setMamber_id(member_id)
    }
    return () => {
      // setSort_agg({})
    }
  }, [  ])


  const handel_submit = () => {
    if (state.national_id.length > 1) {
      apiSelectProfile(state.national_id);
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


  return (
    <div className={Styles["header"]}>
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
            value={state.national_id}
            onChange={(event) => { handelchangeState(event.target.value, 'national_id') }}
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

        <Box ml={5}>
          <p>{state.fullName}</p>
        </Box>
      </Box>

      <div className={Styles["icon"]}>
        <FilterListIcon
          onClick={() => {
            handelShowFilterItems();
          }}
        />
        <RefreshIcon onClick={handleRefresh} style={{ cursor: "pointer" }} />

        {/* <button onClick={()=>apiSelectProfile('0015846237')}>send </button> */}
      </div>
    </div>
  );
}
