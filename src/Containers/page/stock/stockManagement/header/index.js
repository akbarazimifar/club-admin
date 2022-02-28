import React, { useState } from "react";
import Styles from "../../../Posts/Header/index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import RefreshIcon from "@material-ui/icons/Refresh";
import ModalCustom from "./../../../../Common/Components/Modal";
import InsertModal from "./../insertOrEdit";
import { useDispatch } from "react-redux";
import { summaries_v1_actions_insert } from "../../../../../boot/api/profile/summaries/stock_insert_summaries/action";

const HeaderUsers = ({ handleRefresh, setFlagFilter }) => {
  const [flagShow, setFlagShow] = useState(false)
  const dispatch = useDispatch()

  const handleSubmitInsert = (data) => {
    dispatch(summaries_v1_actions_insert(data))
  }

  return (
    <>
      <div className={Styles["header"]}>
        <div>
          <button onClick={() => setFlagShow(prev => !prev)} className="btnsBlue">
            سهم جدید
          </button>
        </div>
        <div className={Styles["icon"]}>
          <FilterListIcon
            onClick={() => setFlagFilter(prev => !prev)}
          />

          <RefreshIcon
            onClick={() => handleRefresh()}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <ModalCustom open={flagShow} setOpen={setFlagShow}>
        <InsertModal
          handleClose={() => setFlagShow(false)}
          handleSubmitInsert={handleSubmitInsert}
        />
      </ModalCustom>
    </>
  );
};

export default HeaderUsers;


