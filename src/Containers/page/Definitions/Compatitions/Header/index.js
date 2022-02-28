import React from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import Buttons from "../Page/Compatitions/Tables/Buttons";
import Excel from "../../../../Common/Components/Excel";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import { useSelector } from "react-redux";

export default function Index({
  handelShowFilterItems,
  flagTypePage,
  handelRefresh,
  setflagTypePage,
  apiCompetitionsSelect,
  apiCompetitionsSelectInRange,
  apiParticipationsSelect,
  idCompetitions,
  value,
  stateFilterStatistic,
  stateFilterCompatitions,
  reducerParticipations
}) {
  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );
  const dataButtons =
    flagTypePage === "compatitions"
      ? [
        {
          name: "افزودن مسابقه جدید",
          className: "btnsBlue",
          nameModal: "insertModal",
        },
      ]
      : []
  // : flagTypePage === "statistics"
  //   ? [
  //     {
  //       name: "اطلاعات تفکیکی",
  //       className: "btnsBlue",
  //       changeRoute: "Separation",
  //     },
  //     {
  //       name: "لیست مسابقات",
  //       className: "btnsBlue",
  //       changeRoute: "compatitions",
  //     },
  //   ]
  //   : flagTypePage === "Separation"
  //     ? [
  //       {
  //         name: "اطلاعات کلی",
  //         className: "btnsBlue",
  //         changeRoute: "statistics",
  //       },
  //       {
  //         name: "لیست مسابقات",
  //         className: "btnsBlue",
  //         changeRoute: "compatitions",
  //       },
  //     ]
  //     : [];



  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام مسابقه ", key: "name" },
    { label: "تاریخ شروع مسابقه", key: "dateStart" },
    { label: "تاریخ پایان مسابقه", key: "dateEnd" },
    { label: "وضعیت", key: "status" },
    { label: "امتیاز شرکت در مسابقه", key: "bonus" },
    { label: "جایزه شرکت در مسابقه", key: "gift" },
  ];

  const handleExcelData = () => {
    let data = null
    if (value === 0) {
      data = stateReducerExcel.data
    } else {
      data = stateReducerExcel.data2
    }

    let dataExcel = data?.map((info, index) => {
      return {
        row: index + 1,
        name: info.body.competition_title,
        dateStart: dateMiladiToShamsi(info.body.start_date?.split(" ")[0]),
        dateEnd: dateMiladiToShamsi(info.body.participation_deadline.split(" ")[0]),
        status: info.body.is_active === "TRUE" ? "فعال" : "غیر فعال",
        bonus: info.body.required_bonus,
        gift: info.body.reward_bonus,
      };
    });

    return dataExcel;
  };


  // let stateFilter = 0
  // if (value === 0) {
  //   stateFilter = stateFilterStatistic
  // } else {
  //   stateFilter = stateFilterCompatitions
  // }



  const filterstateFilterStatistic = () => {
    return {
      ...stateFilterStatistic,
      competition_id: idCompetitions
    }
  }



  const headers2 = [
    { label: "ردیف", key: "row" },
    { label: "نام و نام خانوادگی", key: "name" },
    { label: "کد ملی", key: "nationID" },
    { label: "نام مسابقه", key: "bonusName" },
    { label: "گزینه انتخابی", key: "choice" },
    { label: "تاریخ ثبت", key: "date" },
    { label: "جواب صحیح", key: "true" },
    { label: "جایزه", key: "bonus" },
  ];

  const handleExcelData2 = () => {
    let data = null
    if (value === 0) {
      data = stateReducerExcel.data
    } else {
      data = stateReducerExcel.data2
    }
    let dataExcel = data?.map((info, index) => {
      return {
        row: index + 1,
        name: `${info.body.member_first_name} ${info.body.member_last_name}`,
        nationID: info.body.member_national_id,
        bonusName: info.body.competition_title,
        choice: info.body.choice_number,
        date: info.body.participation_date.split(' ')[0],
        true: info.body.is_correct === "null"
          ? 'در انتظار'
          : info.body.is_correct,
        bonus: info.body.participation_bonus_id === "null"
          ? 'در انتظار'
          : info.body.participation_bonus_id === 'FREE'
            ? 'رایگان'
            : 'نهایی شد'
      };
    });

    return dataExcel;
  };



  const handleExit = () => {
    setflagTypePage("compatitions")
  }




  // competition_id





  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {dataButtons.map((data, index) => {
          return (
            // <button key={index} className={data.className}>{data.name}</button>
            <Buttons
              key={index}
              info={{
                title: data.name,
                className: data.className,
                modal: data.nameModal ? data.nameModal : data.changeRoute,
                flagTypePage: flagTypePage,
              }}
              handleChangeRoute={setflagTypePage}
            />
          );
        })}
        {flagTypePage === "compatitions" && (
          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilterCompatitions}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_competitions"}
            methodTypeNationId={null}
            methodType2={"select_in_range_competitions"}
            methodTypeNationId2={null}
            tableApi={"competition"}
            valueTab={value }
            filename={value ? 'in_range_competitions_report' : 'select_competitions'}
          />

        )}
        {flagTypePage === "statistics" && (
          <Excel
            headers={headers2}
            handleExcelData={handleExcelData2}
            stateFilter={filterstateFilterStatistic()}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_participations"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"competition"}
            valueTab={0}
            filename={'participations_list'}
          />

        )}
      </div>

      <div className={Styles["icon"]}>

        {flagTypePage !== "Separation" && (
          <>
            <FilterListIcon
              onClick={() => {
                handelShowFilterItems();
              }}
            />
            <RefreshIcon onClick={() => handelRefresh(flagTypePage)} />
          </>
        )}
      </div>
    </div>
  );
}
