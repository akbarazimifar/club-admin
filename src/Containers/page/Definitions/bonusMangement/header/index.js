import React from "react";
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


const HeaderUsers = ({ handleRefresh, setFlagFilter, stateFilter, handleNull }) => {

  const classes = useStles();

  const stateReducerExcel = useSelector((state) => state.excel_list_all_reducer);


  const headers = [
    { label: "ردیف", key: 'row' },
    { label: "تاریخ", key: "date_time" },
    { label: "تاریخ مرجع", key: "related_date_time" },
    { label: "کارمزد", key: "total_commission"},
    { label: "کارمزد مرجع", key: "related_total_commission"},
    { label: "جمع امتیازات", key: "bonus_value" },
    { label: "جمع امتیازات مرجع", key: "related_bonus_value" },
    { label: "معادل ریالی امتیازات", key: "rial_equivalent" },
    { label: "معادل ریالی امتیازات مرجع", key: "related_rial_equivalent" },
    { label: "نسبت", key: "ratio" },
    { label: "نسبت مرجع", key: "related_ratio" },

  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        bonus_value: handleNull(info.body.bonus_value),
        related_bonus_value: handleNull(info.body.related_bonus_value),
        date_time: dateMiladiToShamsi(info.body.date_time ? info.body.date_time.split(' ')[0] : ''),
        related_date_time: dateMiladiToShamsi(info.body.related_date_time ? info.body.related_date_time.split(' ')[0] : ''),
        rial_equivalent: handleNull(info.body.rial_equivalent),
        related_rial_equivalent: handleNull(info.body.related_rial_equivalent),
        ratio: handleNull(info.body.ratio),
        related_ratio: handleNull(info.body.related_ratio),
        total_commission: handleNull(info.body.total_commission),
        related_total_commission: handleNull(info.body.related_total_commission),
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
            methodType={"select_management_bonus"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"bonus"}
            valueTab={0}
            filename={'select_management_bonus'}
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


