import React from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import {useSelector } from "react-redux";

import Excel from "../../../../Common/Components/Excel";
import { dateMiladiToShamsi } from "../../../../Common/method/date";

const HeaderUsers = ({ handleRefresh, setFlagFilter, stateFilter }) => {

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const findStatus = (key) => {
    switch (key) {
      case "SUBMITTED":
        return "در انتظار"
      case "REJECTED":
        return "لغو شده"
      case "FINALIZED":
        return "نهایی شده"
      default:
        return "نامشخص"
        break;
    }
  };

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام", key: "member_first_name" },
    { label: "نام خانوادگی", key: "member_last_name" },
    { label: "کد ملی", key: "member_national_id" },
    { label: "عنوان جایزه", key: "online_charge_name" },
    { label: "مبلغ", key: "online_charge_amount" },
    { label:  "امتیاز مورد نیاز", key: "online_charge_required_bonus" },
    { label: "تاریخ", key: "registration_date" },
    { label: "وضعیت", key: "status" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        member_first_name: info.body.member_first_name,
        member_last_name: info.body.member_last_name,
        member_national_id: info.body.member_national_id,
        online_charge_name: info.body.online_charge_name,
        online_charge_amount: info.body.online_charge_amount,
        online_charge_required_bonus: info.body.online_charge_required_bonus,
        registration_date: info.body.registration_date ? dateMiladiToShamsi(info.body.registration_date.split(' ')[0]) : '-',
        status:findStatus( info.body.status),
      };
    });
    return dataExcel;
  };

  return (
    <>
      <div className={Styles["header"]}>
        <Excel
          headers={headers}
          handleExcelData={handleExcelData}
          stateFilter={stateFilter}
          stateReducerExcel={stateReducerExcel}
          methodType={"select_registrations"}
          methodTypeNationId={null}
          methodType2={null}
          methodTypeNationId2={null}
          tableApi={"onlinecharge"}
          valueTab={0}
          filename={'select_registrations'}
        />
     

        <div className={Styles["icon"]}>
          <FilterListIcon
            onClick={() =>
            
              setFlagFilter((prev) => !prev)
            }
          />

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


