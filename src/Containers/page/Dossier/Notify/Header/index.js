import React, { useState } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import ModalAdd from "./ModalAdd";
import { makeStyles } from "@material-ui/core/styles";
import Excel from "../../../../Common/Components/Excel";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import { useSelector } from "react-redux";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Index({ handelShowFilterItems, handleRefresh,stateFilter }) {
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);


  
  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );


  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
    return;
  };



  
  const removeTags = (str)=> {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    //  debugger;
    let str1 = str.replace( /(<([^>]+)>)/ig, '');
    let str2 = str1.replace(/\r?\n|\r/g, '').trim();
  
    // let str2 = str1.text();
    return str2
}



  
  const headers = [
    { label: "ردیف", key: "row" },
    { label: "عنوان ", key: "title" },
    { label: "فرستنده", key: "sender" },
    { label: "منبع", key: "source" },
    { label: "گیرنده", key: "get" },
    { label: "وضعیت", key: "status" },
    { label: "نوع", key: "roll" },
    { label: "تاریخ شروع", key: "dateStart" },
    { label: "تاریخ پایان", key: "dateEnd" },
    { label: "جزییات", key: "details" },
  ];

  
    const handleExcelDataRegister = () => {
      
        let dataExcel = stateReducerExcel.data?.map((info, index) => {
        
          return {
            row: index + 1,
            title: info.body.name,
            sender: info.body.sender_last_name,
            source: info.body.source === 'INTERNAL' ? "سرویس داخلی" : "ادمین",
            get: info.body.receiver_id === "null" ? 'همه' : 'شخص',
            status: info.body.state  === "SENT" ? 'ارسال شده' : info.body.state === "NOT_SENT_Exception" ? "لغو شده" : info.body.state === "IN_QUEUE" ? "در صف ارسال" : "نامشخص",
            roll: info.body.type,
            dateStart: dateMiladiToShamsi(info.body.start_time?.split(" ")[0]),
            dateEnd: dateMiladiToShamsi(info.body.end_time?.split(" ")[0]),
            // details: <div dangerouslySetInnerHTML={{ __html:info.body.content}}></div>
            details: removeTags(info.body.content) 
          };
        });

        return dataExcel;
      }

  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        <button
          className={"btnsBlue"}
          onClick={() => setNewButton((prev) => !prev)}
        >
          افزودن اعلان جدید
        </button>
        <Excel
          headers={headers}
          handleExcelData={handleExcelDataRegister}
          stateFilter={stateFilter}
          stateReducerExcel={stateReducerExcel}
          methodType={"select_notifications"}
          methodTypeNationId={null}
          methodType2={null}
          methodTypeNationId2={null}
          tableApi={"notification"}
          valueTab={0}
          filename={'notifications_report'}
        />
      </div>
      <div className={Styles["icon"]}>
        <FilterListIcon onClick={() => handelShowFilterItems()} />
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
          />
        </Fade>
      </Modal>
    </div>
  );
}
