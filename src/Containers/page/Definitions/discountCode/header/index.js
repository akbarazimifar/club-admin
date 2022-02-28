import React, { useState } from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import Excel from "../../../../Common/Components/Excel";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, Box } from "@material-ui/core";
import Card from "./card";
import { useDispatch } from "react-redux";
import { discountCode_v1_insert_action } from "../../../../../boot/api/Definitions/gift/discountCode_v1_insert/action";

import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";

const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  file: {
    backgroundColor: "white",
  },
  grid: {
    display: "flex",
  },
}));

const HeaderUsers = ({
  handleRefresh,
  setFlagFilter,
  stateFilter,
  national_id,
  setNational_id,
  handelSubmitNationalId,
}) => {
  const classes = useStles();
  let dispatch = useDispatch();
  const [value, setValues] = useState({ file_name: "", file: "" });

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );
  console.log("excelll", stateReducerExcel);

  const [newButton, setNewButton] = useState(false);

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
  };

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "کد تخفیف", key: "code" },
    { label: "نام", key: "issuer_first_name" },
    { label: "نام خانوادگی", key: "issuer_last_name" },
    { label: "کد ملی", key: "issuer_national_id" },
    { label: "دسته بندی", key: "gift_title" },
    { label: "تاریخ انقضا", key: "expiration_date" },
    { label: "تاریخ دریافت", key: "registration_date" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        code: info.body.code,
        issuer_first_name: info.body.issuer_first_name,
        issuer_last_name: info.body.issuer_last_name,
        issuer_national_id: info.body.issuer_national_id,
        gift_title: info.body.gift_title,
        expiration_date: dateMiladiToShamsi(
          info.body.expiration_date?.split(" ")[0]
        ),
        registration_date: dateMiladiToShamsi(
          info.body.registration_date?.split(" ")[0]
        ),
      };
    });
    return dataExcel;
  };

  const handelFile = (data) => {
    if (data) {
      let fileName = data.file_name.split(".");

      if (fileName.length > 3) {
        dispatch(
          dispatch({
            type: "ALERT",
            payload: {
              status: true,
              textAlert: `لطفا نام فایل رو تغییر دهید`,
              typeAlert: "warning",
            },
          })
        );

        return;
      }

      if (fileName[1] === "xlsx" || fileName[1] === "xls") {
        setValues(data);
      } else {
        dispatch(
          dispatch({
            type: "ALERT",
            payload: {
              status: true,
              textAlert: `فرمت فایل رو به درستی وارد نمایید( xlxs , xls )`,
              typeAlert: "warning",
            },
          })
        );
      }
    } else {
      setValues({ file_name: "", file: "" });
    }
  };

  const apiInsertDiscount = () => {
    if (value.file) {
      let data = {
        discount_codes_file_url: value.file,
      };
      dispatch(discountCode_v1_insert_action(data));
      setNewButton(false);
    } else {
      dispatch({
        type: "ALERT",
        payload: {
          status: true,
          textAlert: `لطفا فایل خود را وارد نمایید`,
          typeAlert: "warning",
        },
      });
    }
  };

  return (
    <>
      <div className={Styles["header"]}>
        <div className={classes["grid"]}>
          <button
            className={"btnsBlue"}
            onClick={() => setNewButton((prev) => !prev)}
          >
            جدید
          </button>

          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_single_discount_code"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"discountcode"}
            valueTab={0}
            filename={"single_discount_code_report"}
          />

          <Box>
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
                onChange={(event) => setNational_id(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handelSubmitNationalId()}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                      // onClick={handel_submit}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={270}
              />
            </FormControl>
          </Box>
        </div>

        <div className={Styles["icon"]}>
          <FilterListIcon
            // className={'disabledItems'}
            onClick={() => setFlagFilter((prev) => !prev)}
          />

          <RefreshIcon
            onClick={() => handleRefresh()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      {newButton && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={newButton}
          onClose={() => handleClickButton("NEW")}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={newButton}>
            <Card
              value={value}
              setValues={setValues}
              handelFile={handelFile}
              apiInsertDiscount={apiInsertDiscount}
              setNewButton={setNewButton}
            />
          </Fade>
        </Modal>
      )}
    </>
  );
};

export default HeaderUsers;
