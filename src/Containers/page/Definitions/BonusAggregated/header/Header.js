import React, { useEffect, useState } from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector, useDispatch } from "react-redux";
import {
  dateMiladiToShamsi,
  data_m,
  dateConverttShamsiToMiladi,
} from "../../../../Common/method/date";

import Excel from "../../../../Common/Components/Excel";
import { bonus_aggregated_v1_actions_select } from "../../../../../boot/api/Definitions/bonus/BonusAggregated_v1_select/action";
import { convertDigitToEnglish } from "../../../../Common/method/convertDigitToEnglish";

const HeaderUsers = ({ handleRefresh, setFlagFilter, stateFilter }) => {
  console.log("statefilterrrr", stateFilter);
  const dispatch = useDispatch();

  let initState = {
    is_removed: "",
    from_date_time: null,
    to_date_time: null,
  };

  const [state, setState] = useState(initState);
  useEffect(() => {
    setState({
      is_removed: stateFilter.is_removed,
      from_date_time: !stateFilter.from_date_time
        ? null
        : `${convertDigitToEnglish(
            stateFilter?.from_date_time?.format("YYYY/MM/DD")
          )} 00:00:00.000000`,
      to_date_time: !stateFilter.to_date_time
        ? null
        : `${convertDigitToEnglish(
            stateFilter?.to_date_time?.format("YYYY/MM/DD")
          )} 23:59:59.000000`,
    });
  }, [stateFilter]);

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const data = useSelector((state) => state.bonus_aggregated_v1_select_Reducer);

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "عنوان", key: "bonus_type_name" },
    { label: "مقدار", key: "value" },
    { label: "نوع", key: "is_removed" },
    { label: "تاریخ انجام", key: "date_time" },
    { label: "تاریخ مرجع", key: "related_date" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        bonus_type_name: info.body.bonus_type_name,
        value: info.body.value,
        is_removed: info.body.is_removed === "TRUE" ? "کسر شده" : " اضافه شده",
        date_time: info.body.date_time
          ? dateMiladiToShamsi(info.body.date_time.split(" ")[0])
          : "-",
        related_date: info.body.related_date
          ? dateMiladiToShamsi(info.body.related_date.split(" ")[0])
          : "-",
      };
    });
    return dataExcel;
  };

  const apiSubmitTodayDate = () => {
    let date = data_m();

    let params = {
      sort: {},
      size: data.size,
      from: 0,
      data: {
        from_date_time: date ? `${date.split(" ")[0]} 00:00:00.000000` : "",
        to_date_time: date ? `${date.split(" ")[0]} 23:59:59.999999` : "",
      },
    };

    if (!params.data.from_date_time || !params.data.to_date_time) {
      alert("فرمت تاریخ مناسب نمی باشد لطفادورباره سعی نمایید");
      return;
    }

    dispatch(
      bonus_aggregated_v1_actions_select(
        params.sort,
        params.size,
        params.from,
        params.data
      )
    );
  };

  return (
    <>
      <div className={Styles["header"]}>
        <div>
          <button className={"btnsBlue"} onClick={() => apiSubmitTodayDate()}>
            گزارشات امروز
          </button>
          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={state}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_aggregated_bonus"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"bonus"}
            valueTab={0}
            filename={"Aggregated_bonus_report"}
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
