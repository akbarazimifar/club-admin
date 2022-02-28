import React from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector } from "react-redux";
import Excel from "../../../../Common/Components/Excel";
import { dateMiladiToShamsi } from "./../../../../Common/method/date"

const HeaderUsers = ({ handleRefresh, setFlagFilter, stateFilter, handleNull }) => {

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "عنوان", key: "subscription_title" },
    { label: "توضیحات", key: "subscription_description" },
    { label: "کدملی", key: "member_national_id" },
    { label: "نام", key: "member_first_name" },
    { label: "نام خانوادگی", key: "member_last_name" },
    { label: "تاریخ شروع", key: "start_date" },
    { label: "تاریخ پایان", key: "end_date" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        subscription_title: handleNull(info.body.subscription_title),
        subscription_description: handleNull(info.body.subscription_description),
        member_national_id: handleNull(info.body.member_national_id),
        member_first_name: handleNull(info.body.member_first_name),
        member_last_name: handleNull(info.body.member_last_name),
        start_date: dateMiladiToShamsi(info.body.start_date),
        end_date: dateMiladiToShamsi(info.body.end_date),
      };
    });
    return dataExcel;
  };

  return (
    <>
      <div className={Styles["header"]}>
        <div>
          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_member_subscriptions"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"HADAFHAFEZ"}
            valueTab={0}
            filename={'select_member_subscriptions'}
          />
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


