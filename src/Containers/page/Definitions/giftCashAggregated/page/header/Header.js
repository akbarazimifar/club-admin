import React, { useEffect, useState } from "react";
import Styles from "../../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector, useDispatch } from "react-redux";

import Excel from "../../../../../Common/Components/Excel";
import { GIFTCASHAGGREGATED_V1_EMPTY } from "../../../../../../boot/api/typeActions";

const HeaderUsers = ({ handleRefresh, setFlagFilter, state }) => {

  const [stateFilter, setStateFilter] = useState({})
  const dispatch = useDispatch()
  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );


  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام", key: "member_first_name" },
    { label: "نام خانوادگی", key: "member_last_name" },
    { label: "  نام و نام خانوادگی", key: "fullName" },
    { label: "کد ملی", key: "member_national_id" },
    { label: "کد تفصیلی", key: "member_account_code" },
    { label: "مجموع امتیاز", key: "sum_bonus" },
    { label: "مجموع مبلغ", key: "sum_amount" },
  ];



  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        member_first_name: info.body["member_first_name"],
        member_last_name: info.body["member_last_name"],
        member_national_id: info.body["member_national_id"],
        member_account_code: info.body["member_account_code"],
        sum_bonus: info.body["sum_bonus"],
        sum_amount: info.body["sum_amount"],
        fullName : `${info.body["member_first_name"]} ${info.body["member_last_name"]}`
      };
    });
    return dataExcel;
  };

  useEffect(() => {
    setStateFilter(
      {
        from_date: `${state.from_date} 00:00:00.000000`,
        to_date: `${state.to_date} 23:59:59.000000`,
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
            methodType={"online_charge_report"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"onlinecharge"}
            valueTab={0}
            filename={'online_charge_report'}
          />

          <button className={'btnsBlue'}
            onClick={() => dispatch({ type: GIFTCASHAGGREGATED_V1_EMPTY })}
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


