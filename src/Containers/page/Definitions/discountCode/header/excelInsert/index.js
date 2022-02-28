import React, { useEffect } from "react";
import { CSVLink } from "react-csv";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import { dateMiladiToShamsi } from "./../../../../../Common/method/date";
import { DISCOUNT_CODE_EXCEL_EMPTY } from "./../../../../../../boot/api/typeActions";

export default function Index({ data, flagExcel, setFlagExcel }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch({ type: DISCOUNT_CODE_EXCEL_EMPTY });
    };
  }, [flagExcel]); //eslint-disable-line react-hooks/exhaustive-deps

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
    let dataExcel = data?.map((info, index) => {
      return {
        row: index + 1,
        code: info.code,
        issuer_first_name: info.issuer_first_name,
        issuer_last_name: info.issuer_last_name,
        issuer_national_id: info.issuer_national_id,
        gift_title: info.gift_title,
        expiration_date: info.expiration_date ? dateMiladiToShamsi(
          info.expiration_date.split(" ")[0]
        ) : "",
        registration_date: info.registration_date ? dateMiladiToShamsi(
          info.registration_date.split(" ")[0]
        ) : "",
      };
    });
    return dataExcel;
  };

  const handleClose = () => {
    setFlagExcel(false);
  };

  return (
    <div>
      <Dialog
        open={flagExcel}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">خروجی اکسل</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا برای خروجی گرفتن مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            لغو
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            <CSVLink
              data={handleExcelData()}
              headers={headers}
              filename={"discount_code_report.csv"}
            >
              تایید
            </CSVLink>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
