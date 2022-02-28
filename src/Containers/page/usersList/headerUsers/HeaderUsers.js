import React from "react";
import Styles from "../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import {useSelector } from "react-redux";

import Excel from "../../../Common/Components/Excel";
import { branchName } from "../tableusers/TableUsers";

const HeaderUsers = ({ handleRefresh, setFlagFilter, stateFilter }) => {

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const fun_roll = (key) => {
    switch (key) {
      case "ADMIN":
        return { value: "ادمین", roll: "ADMIN" };
      case "OPERATOR":
        return { value: "اپراتور", roll: "OPERATOR" };
      case "MEMBER":
        return { value: "کاربر عادی", roll: "MEMBER" };
      default:
        break;
    }
  };

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام", key: "name" },
    { label: "نام خانوادگی", key: "lastName" },
    { label: "کد ملی", key: "nationId" },
    { label: "نقش", key: "roll" },
    { label: "موبایل", key: "phone" },
    { label: "ایمیل", key: "email" },
    { label: "کد معرفی", key: "code" },
    { label: "امتیاز", key: "bonus" },
    { label: "نام شعبه", key: "branch_name" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        name: info.body.first_name,
        lastName: info.body.last_name,
        nationId: info.body.national_id,
        roll: fun_roll(info.body.category).value,
        phone: info.body.phone,
        email: info.body.email,
        code: info.body.automation_id,
        bonus: info.body.available_bonus,
        branch_name: branchName(info.body.branch_name),
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
          methodType={"select"}
          methodTypeNationId={null}
          methodType2={null}
          methodTypeNationId2={null}
          tableApi={"clubmember"}
          valueTab={0}
          filename={'clubmember_report'}
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


