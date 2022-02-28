import React, { useState } from "react";
import styles from "./index.module.scss";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Refresh } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import Excel from "../../../../Common/Components/Excel";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core";
import ModalInsert from './modalInsert/ModalInsert';


const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));


const Index = ({ setflagFilter, stateFilter, handelRefresh, setflagApi , setSort,setpageTab1 , setstateFilter }) => {

  const classes = useStyles();

  const [newButton, setNewButton] = useState(false);
  const stateReducerExcel = useSelector((state) => state.excel_list_all_reducer);

  const headers = [
    { label: "ردیف", key: "row" },
    { label: "نام", key: "member_first_name" },
    { label: "نام خانوادگی", key: "member_last_name" },
    { label: "کد ملی", key: "member_national_id" },
    { label: "نماد", key: "stock_symbol" },
    { label: "شرکت", key: "company_name" },
    { label: "تاریخ مجمع", key: "agm_date" },
    { label: "تعداد سهام", key: "stocks" },
    { label: "ارزش سود", key: "dividend_value" },
    { label: "سود ناخالص نقدی توزیع شده", key: "distributed_gross_margin" },
    { label: "سود خالص نقدی توزیع شده", key: "distributed_netincome" },
    { label: "تاریخ اعلام", key: "publish_date" },
    { label: "تاریخ پرداخت", key: "pay_date" },
    { label: "ارزش سهام پیش از مجمع ", key: "pre_price_stock_agm" },
    { label: "قیمت سهم پس از مجمع", key: "post_price_stock_agm" },
    { label: "قیمت سهم پیش از مجمع", key: "pre_value_stock" },
    { label: "ارزش سهام پس از مجمع", key: "post_value_stock" },
    { label: "سرمایه شرکت", key: "company_asset" },
    { label: "سود خالص تحقق یافته", key: "valid_netincome" },
  ];

  const handleExcelData = () => {
    let dataExcel = stateReducerExcel.data?.map((info, index) => {
      return {
        row: index + 1,
        member_first_name: info.body.member_first_name,
        member_last_name: info.body.member_last_name,
        member_national_id: info.body.member_national_id,
        stock_symbol: info.body.stock_symbol,
        company_name: info.body.company_name,
        agm_date:
          info.body.agm_date
            ? dateMiladiToShamsi(info.body.agm_date.split(' ')[0])
            : '',
        stocks: info.body.stocks,
        dividend_value: info.body.dividend_value,
        distributed_gross_margin: info.body.distributed_gross_margin,
        distributed_netincome: info.body.distributed_netincome,
        publish_date:
          info.body.publish_date
            ? dateMiladiToShamsi(info.body.publish_date.split(' ')[0])
            : '',
        pay_date: info.body.pay_date
          ? dateMiladiToShamsi(info.body.pay_date.split(' ')[0])
          : '',
        pre_price_stock_agm: info.body.pre_price_stock_agm,
        post_price_stock_agm: info.body.post_price_stock_agm,
        pre_value_stock: info.body.pre_value_stock,
        post_value_stock: info.body.post_value_stock,
        company_asset: info.body.company_asset,
        valid_netincome: info.body.valid_netincome,
      };
    });
    return dataExcel;
  };

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
    return;
  };

  return (
    <>
      <div className={styles["header"]}>
        <div>
          <button className={"btnsBlue"} onClick={() => setNewButton(!newButton)}>
            {"افزودن جدید"}
          </button>
          <Excel
            headers={headers}
            handleExcelData={handleExcelData}
            stateFilter={stateFilter}
            stateReducerExcel={stateReducerExcel}
            methodType={"select_codal_participation"}
            methodTypeNationId={null}
            methodType2={null}
            methodTypeNationId2={null}
            tableApi={"codal"}
            valueTab={0}
            filename={'select_codal_participation'}
          />

        </div>

        <div className={styles["button"]}>
          <FilterListIcon className={styles['icons']} onClick={() => setflagFilter((prev) => !prev)} />
          <Refresh className={styles['icons']} onClick={() => handelRefresh()} />
        </div>

        {
          newButton && (
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
                <ModalInsert
                  setNewButton={setNewButton}
                  setflagApi={setflagApi}
                  setSort={setSort}
                  setpageTab1={setpageTab1}
                  setstateFilter={setstateFilter}
                />
              </Fade>
            </Modal>
          )
        }
      </div>
    </>
  );
};

export default Index;
