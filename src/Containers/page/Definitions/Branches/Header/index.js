import React, { useState } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import ModalAdd from "./ModalAdd";
import { useSelector } from "react-redux";
import Excel from "../../../../Common/Components/Excel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Index({
  handelSubmitAdd,
  api_call_select,
  handleRefresh,
}) {
  const dataButtons = [
    { name: "افزودن شعبه", type: "", className: "btnsBlue" },
  ];
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
    return;
  };
  // __________________________excel___________________

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "شعبه", key: "branch" },
    { label: "استان", key: "provinc" },
    { label: "شهر", key: "city" },
    { label: "مسئول	", key: "author" },
    { label: "آدرس", key: "address" },
    { label: "تلفن", key: "phone" },
    { label: "کد", key: "code" },
    { label: "کد پستی", key: "postalCode" },
    { label: "کد معرف شعبه", key: "recommender_id" },
  ];
  
  const handleExcelData = () => {
    
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        branch: info.body.Name,
        provinc: info.body.ProvinceName,
        city: info.body.CityName,
        author: info.body.DirectorName,
        address: info.body.Address,
        phone: info.body?.PhoneNumber,
        code: info.body.CityCodePhoneNumber,
        postalCode: info.body.PostalCode,
        recommender_id: info.body.recommender_id,
      };
    });
    return dataExcel;
  };

  // __________________________________________________

  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        {dataButtons.map((data, index) => {
          return (
            <button
              key={index}
              className={data.className}
              onClick={() => {
                setNewButton(!newButton);
              }}
            >
              {data.name}
            </button>
          );
        })}
        <Excel
          headers={headers}
          handleExcelData={handleExcelData}
          stateFilter={{}}
          stateReducerExcel={stateReducerExcel}
          methodType={"select"}
          methodTypeNationId={null}
          methodType2={null}
          methodTypeNationId2={null}
          tableApi={"shoab"}
          valueTab={0}
          filename={'shoab_report'}
        />
      </div>
      <div className={Styles["icon"]}>
        {/* <FilterListIcon onClick={()=>{handelShowFilterItems()}} /> */}
        <RefreshIcon onClick={handleRefresh} />
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
          <ModalAdd
            setNewButton={setNewButton}
            handleCloseModal={() => handleClickButton("NEW")}
            handelSubmitAdd={handelSubmitAdd}
          />
        </Fade>
      </Modal>
    </div>
  );
}
