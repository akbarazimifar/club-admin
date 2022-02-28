import React from "react";
import Styles from '../Header/index.module.scss'
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import {useSelector } from "react-redux";

const HeaderUsers = ({ 
    // handleRefresh, setFlagFilter, stateFilter
    handleRefresh, 
    setFlagFilter
}) => {

  // const stateReducerExcel = useSelector(
  //   (state) => state.excel_list_all_reducer
  // );

//   const fun_roll = (key) => {
//     switch (key) {
//       case "ADMIN":
//         return { value: "ادمین", roll: "ADMIN" };
//       case "OPERATOR":
//         return { value: "اپراتور", roll: "OPERATOR" };
//       case "MEMBER":
//         return { value: "کاربر عادی", roll: "MEMBER" };
//       default:
//         break;
//     }
//   };



  return (
    <>
      <div className={Styles["header"]}>
        <span></span>
        {/* <Excel
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
      */}

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