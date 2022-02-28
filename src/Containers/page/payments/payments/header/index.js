import React, { useState } from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector } from "react-redux";
import { dateMiladiToShamsi } from '../../../../Common/method/date';
import Excel from "../../../../Common/Components/Excel";
import { makeStyles } from "@material-ui/core";

const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  file: {
    backgroundColor: 'white'
  },
  grid: {
    display: 'flex',

  }
}));


const HeaderUsers = ({ handleRefresh, setFlagFilter, stateFilter, handelReturned_from_bank, handelIs_verified, handleNull , handelTerminal_id }) => {

  const classes = useStles();

  const stateReducerExcel = useSelector((state) => state.excel_list_all_reducer);


  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام", key: "member_first_name" },
    { label: "نام خانوادگی", key: "member_last_name" },
    { label: "کد ملی", key: "member_national_id" },
    { label: "شماره پایانه", key: "terminal_id" },
    { label: "کد تفضیلی", key: "member_account_code" },
    { label: "شناسه اتوماسیون", key: "member_automation_id" },
    { label: "شناسه تراکنش", key: "payment_id" },
    { label: "بازگشت از بانک", key: "returned_from_bank" },
    { label: "نتیجه بازگشتی", key: "returned_result" },
    { label: "توضیحات", key: "returned_description" },
    { label: "مبلغ", key: "amount" },
    { label: "تاریخ تایید تراکنش", key: "verification_date" },
    { label: "تاریخ درخواست", key: "request_date" },
    { label: "تایید تراکنش", key: "is_verified" },
    { label: "وضعیت", key: "club_state" },

  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        member_first_name: handleNull(info.body.member_first_name),
        member_last_name: handleNull(info.body.member_last_name),
        expiration_date: dateMiladiToShamsi(info.body.expiration_date ? info.body.expiration_date.split(' ')[0] : ''),
        member_national_id: handleNull(info.body.member_national_id),
        member_account_code: handleNull(info.body.member_account_code),
        member_automation_id: handleNull(info.body.member_automation_id),
        payment_id: handleNull(info.body.payment_id),
        returned_from_bank: handelReturned_from_bank(info.body.returned_from_bank, true),
        returned_result: handleNull(info.body.returned_result),
        returned_description: handleNull(info.body.returned_description),
        amount: handleNull(info.body.amount),
        verification_date: handleNull(info.body.verification_date),
        request_date: dateMiladiToShamsi(info.body.request_date ? info.body.request_date.split(' ')[0] : ''),
        is_verified: handelIs_verified(info.body.is_verified , true),
        club_state: handleNull(info.body.club_state),
        terminal_id:handelTerminal_id(info.body.terminal_id),
      };
    });
    return dataExcel;
  };



  return (
    <>
      <div className={Styles["header"]}>
        <div className={classes['grid']}>

          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_payments"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"payment"}
            valueTab={0}
            filename={'select_payments'}
          />


        </div>

        <div className={Styles["icon"]}>
          <FilterListIcon onClick={() => setFlagFilter((prev) => !prev)} />
          <RefreshIcon
            onClick={() => handleRefresh()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>


    </>
  );
};

export default HeaderUsers;


