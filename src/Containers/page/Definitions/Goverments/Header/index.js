import React, { useState } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import ModalAdd from "./ModalAdd";
import { useSelector } from "react-redux";
import Excel from '../../../../Common/Components/Excel'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Index({ handelShowFilterItems, handleRefresh,stateFilter}) {
  // const dataButtons = [
  //   { name: 'افزودن دفاتر پیشخوان', type: '', className: 'btnsBlue' },
  // ]
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
    return;
  };

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "استان", key: "provinc" },
    { label: "مسئول دفتر", key: "athur" },
    { label: "کد دفتر", key: "code" },
    { label: "تلفن یا فکس", key: "phone" },
    { label: "کد پستی	", key: "postalCode" },
    { label: "آدرس", key: "address" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        provinc: info.body.ProvinceName,
        athur: info.body.FullName,
        code: info.body.OfficeId,
        phone: info.body.PhoneNumber,
        postalCode: info.body.PostalCode,
        address: info.body.Address,
      };
    });
    return dataExcel;
  };



  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {/* {
          dataButtons.map((data, index) => {
            return (
              <button key={index} className={data.className} onClick={() => { setNewButton(!newButton) }}>{data.name}</button>
            )
          })
        } */}
        <Excel
          headers={headers}
          handleExcelData={handleExcelData}
          stateFilter={stateFilter}
          stateReducerExcel={stateReducerExcel}
          methodType={"select"}
          methodTypeNationId={null}
          methodType2={null}
          methodTypeNationId2={null}
          tableApi={"pishkhan"}
          valueTab={0}
          filename={'pishkhan_report'}
        />
      </div>
      <div className={Styles["icon"]}>
        <FilterListIcon
          onClick={() => {
            handelShowFilterItems();
          }}
        />
        <RefreshIcon onClick={handleRefresh} style={{ cursor: "pointer" }} />
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => handleClickButton("NEW")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={newButton}>
          <ModalAdd setNewButton={setNewButton} />
        </Fade>
      </Modal>
    </div>
  );
}
