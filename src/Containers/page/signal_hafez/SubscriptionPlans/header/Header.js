import React, { useState } from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useSelector } from "react-redux";
import Excel from "../../../../Common/Components/Excel";
import ModalCustom from "./../../../../Common/Components/Modal";
import ModalInsertSignal from "./ModalInsertSignal";

const HeaderUsers = ({ handleRefresh, setFlagFilter, stateFilter , handleSubmitInsert }) => {
  const [modalInsert, setmodalInsert] = useState(false)

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "عنوان", key: "title" },
    { label: "امتیاز مورد نیاز", key: "required_bonus" },
    { label: "مدت زمان اشتراک", key: "duration" },
    { label: "توضیحات", key: "description" },
    { label: "وضعیت", key: "is_active" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        title: info.body.title,
        required_bonus: info.body.required_bonus,
        duration: info.body.duration,
        description: info.body.description,
        is_active: info.body.is_active === "TRUE" ? "فعال" : info.body.is_active === "FALSE" ? "غیر فعال" :"نامعلوم"
      };
    });
    return dataExcel;
  };

  return (
    <>
      <div className={Styles["header"]}>
        <div>
          <button className="btnsBlue" onClick={() => setmodalInsert(true)}>
            پلن جدید
          </button>

          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_subscription_plans"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"HADAFHAFEZ"}
            valueTab={0}
            filename={'select_subscription_plans'}
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
      <ModalCustom open={modalInsert} setOpen={setmodalInsert}>
        <ModalInsertSignal setOpen={setmodalInsert} handleSubmitInsert={handleSubmitInsert}/>
      </ModalCustom>
    </>
  );
};

export default HeaderUsers;


