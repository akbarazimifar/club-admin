import React from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector } from "react-redux";
import { dateMiladiToShamsi } from './../../../../Common/method/date';
import Excel from "../../../../Common/Components/Excel";

const HeaderUsers = ({ handleRefresh, setFlagFilter, stateFilter, requestStatus, Isin }) => {

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );


  const headers = [
    { label: "ردیف", key: "row" },
    { label: "شناسه سهم", key: "isin" },
    { label: "تاریخ ثبت درخواست ", key: "request_date" },
    { label: "وضعیت", key: "state" },
    { label: "توضیحات", key: "description" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        isin: Isin[info.body.isin] ? Isin[info.body.isin] : info.body.isin,
        request_date: dateMiladiToShamsi(info.body.request_date.split(' ')[0]),
        state: requestStatus(info.body.state),
        description: info.body.description,

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
          methodType={"select_change_brokers"}
          methodTypeNationId={null}
          methodType2={null}
          methodTypeNationId2={null}
          tableApi={"changebroker"}
          valueTab={0}
          filename={'change_brokers_report'}
        />


        <div className={Styles["icon"]}>
          <FilterListIcon
            // className={'disabledItems'}
          onClick={() =>setFlagFilter((prev) => !prev) }

            
         
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


