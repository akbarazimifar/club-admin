import React, { useEffect, useState } from "react";
import Styles from "../../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector, useDispatch } from "react-redux";

import Excel from "../../../../../Common/Components/Excel";
import { GIFTAGGREGATED_V1_EMPTY } from "../../../../../../boot/api/typeActions";

const HeaderUsers = ({ handleRefresh, setFlagFilter, state }) => {

  const [stateFilter, setStateFilter] = useState({})
  const dispatch = useDispatch()
  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );


  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام و نام خانوادگی", key: "نام و نام خانوادگی" },
    { label: "کد ملی", key: "کد ملی" },
    { label: "کد تفصیلی", key: "کد تفصیلی" },
    { label: "وضعیت", key: "وضعیت" },
    { label: "مجموع امتیاز", key: "مجموع امتیاز" },
  ];


  
  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        "نام و نام خانوادگی": info.body["نام و نام خانوادگی"],
        "کد ملی": info.body["کد ملی"],
        "کد تفصیلی": info.body["کد تفصیلی"],
        "وضعیت": info.body["وضعیت"],
        "مجموع امتیاز": info.body["مجموع امتیاز"]
      };
    });
    return dataExcel;
  };

  useEffect(() => {
    setStateFilter(
      {
        start_time: `${state.start_time} 00:00:00.000000`,
        end_time: `${state.end_time} 23:59:59.000000`,
      }
    )
  }, [state])

  return (
    <>
      <div className={Styles["header"]}>
        <div>
          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_aggregated_user_registrations"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"gift"}
            valueTab={0}
            filename={'select_aggregated_user_registrations'}
          />

          <button className={'btnsBlue'}
            onClick={() => dispatch({ type: GIFTAGGREGATED_V1_EMPTY })}
          >
            گزارش جدید
            </button>

        </div>
        
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


