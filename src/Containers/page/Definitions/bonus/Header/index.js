import React, { Fragment, useState, useEffect } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import Box from "@material-ui/core/Box";
import ModalCustom from "./../../../../Common/Components/Modal";
import ModalContent from "./ModalContent";
import Excel from "../../../../Common/Components/Excel";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import SearchNationalCode from './SearchNationalCode';
import { useSelector, useDispatch } from "react-redux";
import ButtonsComputingBonos from './buttonComputingBunos';

import { COMPETITIONS_PROFILE_V1_EMPTY } from "../../../../../boot/api/typeActions";
import { competitions_profile_v1_action_select } from "../../../../../boot/api/Definitions/Compatitions/person_v1_select/action";



export default function Index({ setflagFilter, handleRefresh, valueTab, stateFilter }) {

  const dispatch = useDispatch();

  const [flag, setFlag] = useState({ status: false, type: "" })
  const [flagAddPoint, setFlagAddPoint] = useState(false);
  const [flagReserve, setFlagReserve] = useState(false);
  const [flagDeduction, setFlagDeduction] = useState(false);
  const [flagButtonsComputing, setFlagButtonsComputing] = useState(false);

  const reducerProfile = useSelector((state) => state.competitions_profile_v1_reducer);
  const stateReducerExcel = useSelector((state) => state.excel_list_all_reducer);

  const handleTypeStatus = (data) => {
    if (data === "REJECTED") {
      return "لغوشده";
    }
    if (data === "FINALIZED") {
      return "نهایی شده";
    }
    if (data === "RESERVED") {
      return "رزو شده";
    }
    if (data === "NOT_PROCESSED") {
      return "نا مشخص";
    }
  };


  const headers = [
    { label: "ردیف", key: "row" },
    { label: "شناسه کاربر", key: "userCode" },
    { label: "مقدار", key: "value" },
    { label: "تاریخ ایجاد  ", key: "dateAdd" },
    { label: "تاریخ اعمال", key: "dateAccept" },
    { label: "وضعیت", key: "status" },
    { label: "نوع", key: "type" },
    { label: "مبدا", key: "origin" },
    { label: "توضیحات مبدا", key: "Description" },
    { label: "مجموع", key: "total" },
    { label: "اضافه شده", key: "totalAdd" },
    { label: "کسر شده", key: "totalRemove" },
  ];

  const handleExcelData = () => {
    let data = null;
    if (valueTab === 0) {
      data = stateReducerExcel.data;
    } else {
      data = stateReducerExcel.data2;
    }
    let dataExcel = data?.map((info, index) => {

      if (!index) {
        let array = [...data]

        let Positive = 0
        let negative = 0

        array.forEach((item => {
          let flag = item.body.bonus_type.includes('REMOVE')
          if (flag)
            negative += item.body.value
          if (!flag)
            Positive += item.body.value
        }))

        return {
          row: index + 1,
          total: Positive - negative,
          totalAdd: Positive,
          totalRemove: negative,
          userCode: info.body.member_id,
          value: info.body.bonus_type.includes('REMOVE') ? `-${info.body.value}` : info.body.value,
          dateAdd: dateMiladiToShamsi(info.body.create_date.split(" ")[0]),
          dateAccept: dateMiladiToShamsi(info.body.closing_date?.split(" ")[0]),
          status: handleTypeStatus(info.body.status),
          type: info.body.bonus_type,
          origin: info.body.source,
          Description: info.body.source_description,
        };
      }

      return {
        row: index + 1,
        userCode: info.body.member_id,
        value: info.body.bonus_type.includes('REMOVE') ? `-${info.body.value}` : info.body.value,
        dateAdd: dateMiladiToShamsi(info.body.create_date.split(" ")[0]),
        dateAccept: dateMiladiToShamsi(info.body.closing_date?.split(" ")[0]),
        status: handleTypeStatus(info.body.status),
        type: info.body.bonus_type,
        origin: info.body.source,
        Description: info.body.source_description,
      };
    });
    return dataExcel;
  };


  const apiselectProfile = (national_id) => {
    dispatch(competitions_profile_v1_action_select(national_id));
  };

  const apiselectProfileEmpty = () => {
    dispatch({ type: COMPETITIONS_PROFILE_V1_EMPTY });
  };

  const handelRouterModal = () => {

    switch (flag.type) {
      case "setFlagAddPoint":
        setFlagAddPoint(true)
        return;
      case "setFlagReserve":
        setFlagReserve(true)
        return
      case "setFlagDeduction":
        setFlagDeduction(true)
        return

      default:
        setFlag({ status: false, type: "" })
        break;
    }
  }

  useEffect(() => {

    return () => {
      apiselectProfileEmpty()
    }
  }, [])

  return (
    <Fragment>
      <div className={Styles["header"]}>
        <Box borderRadius={20} ml={5}>

          <button onClick={() => setFlag({ status: true, type: "setFlagAddPoint" })} className="btnsGreen">
            افزودن امتیاز
          </button>
          <button onClick={() => setFlag({ status: true, type: "setFlagReserve" })} className="btnsBlue">
            رزرو امتیاز
          </button>
          <button onClick={() => setFlag({ status: true, type: "setFlagDeduction" })} className="btnsRed">
            کسر امتیاز
          </button>
          {/* <button onClick={() => setFlagButtonsComputing(true)} className="btnsYellow">
             محاسبه مجدد امتیاز
          </button> */}

          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            stateReducerExcel={stateReducerExcel}
            methodType={"select"}
            methodTypeNationId={"select_by_national_id"}
            methodType2={"select_bonus_requests"}
            methodTypeNationId2={"select_bonus_requests_by_national_id"}
            tableApi={"bonus"}
            valueTab={valueTab}
            filename={'bonus_by_national_id_report'}
          />

        </Box>

        <Box className={Styles["icon"]}>
          <FilterListIcon onClick={() => setflagFilter((prev) => !prev)} />
          <RefreshIcon
            style={{ cursor: "pointer" }}
            onClick={() => handleRefresh()}
          />
        </Box>
      </div>


      <ModalCustom open={flag.status} setOpen={() => setFlag({ status: false, type: "" })}>
        <SearchNationalCode
          apiselectProfile={apiselectProfile}
          reducerProfile={reducerProfile}
          setFlag={setFlag}
          handelRouterModal={handelRouterModal}
        />
      </ModalCustom>

      <ModalCustom open={flagAddPoint} setOpen={setFlagAddPoint}>
        <ModalContent
          type="ADD"
          setFlag={setFlag}
          reducerProfile={reducerProfile.data}
          setFlagAddPoint={setFlagAddPoint}
          apiselectProfileEmpty={apiselectProfileEmpty}
        />
      </ModalCustom>

      <ModalCustom open={flagReserve} setOpen={setFlagReserve}>
        <ModalContent
          type="RESERVE"
          setFlag={setFlag}
          reducerProfile={reducerProfile.data}
          setFlagAddPoint={setFlagReserve}
          apiselectProfileEmpty={apiselectProfileEmpty}
        />
      </ModalCustom>

      <ModalCustom open={flagDeduction} setOpen={setFlagDeduction}>
        <ModalContent
          type="DEDUCTION"
          setFlag={setFlag}
          reducerProfile={reducerProfile.data}
          setFlagDeduction={setFlagDeduction}
          apiselectProfileEmpty={apiselectProfileEmpty}
        />
      </ModalCustom>

      <ModalCustom open={flagButtonsComputing} setOpen={setFlagButtonsComputing}>
        <ButtonsComputingBonos 
        open={flagButtonsComputing} 
        setOpen={setFlagButtonsComputing}
        />
      </ModalCustom>


    </Fragment>
  );
}


