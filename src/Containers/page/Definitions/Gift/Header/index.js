import React, { useState } from "react";
import Styles from "./index.module.scss";
import RefreshIcon from "@material-ui/icons/Refresh";
import FilterListIcon from "@material-ui/icons/FilterList";
import ModalInsert from "./insertModal";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import Excel from "../../../../Common/Components/Excel";
import AlertDialogSlide from "./../../../../Common/Components/AlertDialogSlide";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Index({
  setFlagFilter,
  apiGiftInsert,
  handleRefresh,
  reducerCategories,
  reducerSubcategories,
  change_gift_category_method,
  stateFilterRegistration,
  selectMultiRow,
  submitMultiSelectFinally,
  submitMultiSelectReject,
  valueTab,
  stateFilter,
}) {
  const classes = useStyles();
  const [newButton, setNewButton] = useState(false);
  const [showAlertFinaly, setshowAlertFinaly] = useState(false);
  const [showAlertReject, setshowAlertReject] = useState(false);

  const stateReducerExcel = useSelector(
    (state) => state.excel_list_all_reducer
  );

  const handleOkAlertfinaly = () => {
    submitMultiSelectFinally();
    setshowAlertFinaly(false);
  };

  const handleOkAlertReject = () => {
    submitMultiSelectReject();
    setshowAlertReject(false);
  };

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
    return;
  };

  //________________________excelData________________________________
  const headers = [
    { label: "ردیف", key: "row" },
    { label: "کد کالا", key: "gift_code" },
    { label: "شماره سفارش", key: "basket_code" },
    { label: "نام جایزه", key: "giftName" },
    { label: "امتیاز", key: "gift_required_bonus" },
    { label: "مانده امتیاز", key: "member_available_bonus" },
    { label: "کد ملی", key: "nationId" },
    { label: "نام و نام خانوادگی", key: "name" },
    { label: "تاریخ درخواست", key: "dateRegister" },
    { label: "وضعیت", key: "status" },
    { label: "کد رهگیری پستی", key: "postal_tracking_code" },
    { label: "نام سهم", key: "instrumentName" },
    { label: "نام گیرنده", key: "personName" },
    { label: "شماره موبایل", key: "phone" },
    { label: "استان", key: "provinceName" },
    { label: "شهر", key: "cityName" },
    { label: "آدرس", key: "address" },
    { label: "کد پستی", key: "postCode" },



  ];
  const headers2 = [
    { label: "ردیف", key: "row" },
    { label: "عنوان", key: "title" },
    { label: "نام", key: "name" },
    { label: "گروه", key: "gift_category" },
    { label: "زیر گروه", key: "gift_sub_category" },
    { label: "امتیاز مورد نظر", key: "required_bonus" },
    { label: "ظرفیت باقی مانده", key: "remained_capacity" },
    { label: "نوع", key: "type" },
    { label: "تاریخ انقضاء", key: "expiration_time" },
    { label: "کد کالا", key: "gift_code" },
  ];

  function Convertnumber2english(str) {
    let str2 = undefined;
    str = str.replaceAll("۰", "0");
    str = str.replaceAll("۱", "1");
    str = str.replaceAll("۲", "2");
    str = str.replaceAll("۳", "3");
    str = str.replaceAll("۴", "4");
    str = str.replaceAll("۵", "5");
    str = str.replaceAll("۶", "6");
    str = str.replaceAll("۷", "7");
    str = str.replaceAll("۸", "8");
    str = str.replaceAll("۹", "9");

    return str;
  }

  const handleItem = (customData) => {

    let obj = {};
    customData?.map((item) => {
      switch (item.name) {
        case "phoneNumber":
          return (obj["phone"] = Convertnumber2english(item.value));
        case "mobile":
          return (obj["phone"] = Convertnumber2english(item.value));
        case "provinceName":
          return (obj["provinceName"] = item.value);
        case "cityName":
          return (obj["cityName"] = item.value);
        case "postalCode":
          return (obj["postCode"] = item.value);
        case "personName":
          return (obj["personName"] = item.value);
        case "address":
          return (obj["address"] = item.value);
        case "instrumentName":
          return (obj["instrumentName"] = item.value);
        default:
          return {};
      }
    });

    return obj;
  };

  const handelType = (type) => {
    switch (type) {
      case "PHYSICAL":
        return "تحویل فیزیکی";
      case "OFF_CODE":
        return "کد تخفیف";
      case "NO_TYPE":
        return "عمومی";
      case "ONLINE_CHARGE":
        return "شارژ آنلاین";
      case "BIMEH_SAMAN":
        return "بیمه سامان";
      case "UP":
        return "آپ";
      case "DG":
        return "دیجی کالا";

      default:
        break;
    }
  };

  const handleExcelData = () => {
    if (valueTab === 0) {
      let dataExcel = stateReducerExcel.data?.map((info, index) => {
        return {
          row: index + 1,
          title: info.body.title,
          name: info.body.name,
          gift_category: info.body.gift_category,
          gift_sub_category: info.body.gift_sub_category,
          required_bonus: info.body.required_bonus,
          remained_capacity: info.body.remained_capacity,
          type: handelType(info.body.type),
          expiration_time: dateMiladiToShamsi(
            info.body.expiration_time.split(" ")[0]
          ),
          gift_code: info.body.gift_code === "null" ? "" : info.body?.gift_code,
        };
      });

      return dataExcel;
    } else {

      let dataExcel = stateReducerExcel.data2?.map((info, index) => {

        return {
          row: index + 1,
          basket_code: info.body.basket_code,
          giftName: info.body.gift_name,
          gift_required_bonus: info.body.gift_required_bonus,
          member_available_bonus: info.body.member_available_bonus,
          nationId: info.body.member_national_id,
          name: `${info.body.member_first_name} ${info.body.member_last_name}`,
          dateRegister: dateMiladiToShamsi(
            info.body.registration_date?.split(" ")[0]
          ),
          status:
            info.body.status === "SUBMITTED"
              ? "در انتظار"
              : info.body.status === "REJECTED"
                ? "لغو شده"
                : info.body.status === "FINALIZED"
                  ? "نهایی شده"
                  : "نامشخص",
          postal_tracking_code: info.body.postal_tracking_code === "null" ? "" : info.body.postal_tracking_code,
          ...handleItem(
            info.body?.gift_custom_data
              ? JSON.parse(info.body?.gift_custom_data)
              : []
          ),
          gift_code: info.body.gift_type === 'PHYSICAL'
            ? (info.body.gift_code && info.body.gift_code !== 'null')
              ? info.body.gift_code
              : ''
            : ''
        };
      });

      return dataExcel;
    }
  };

  //___________________________________________________________

  return (
    <div className={Styles["header"]}>
      <div className={Styles["button"]}>
        <button className={"btnsBlue"} onClick={() => setNewButton(!newButton)}>
          {"افزودن جایزه جدید"}
        </button>
        <br />

        <Excel
          headers={valueTab === 0 ? headers2 : headers}
          handleExcelData={handleExcelData}
          stateFilter={valueTab === 0 ? stateFilter : stateFilterRegistration}
          stateReducerExcel={stateReducerExcel}
          methodType={"select_gifts_without_image"}
          methodType2={"select_registrations"}
          methodTypeNationId={null}
          methodTypeNationId2={null}
          tableApi={"gift"}
          valueTab={valueTab}
          filename={"gift_registrations_report"}
        />

        {Object.keys(selectMultiRow).length !== 0 && (
          <button
            onClick={() => setshowAlertFinaly(true)}
            className={"btnsGreen"}
          >
            {`نهایی کردن دسته ای(${Object.keys(selectMultiRow).length})`}
          </button>
        )}

        {Object.keys(selectMultiRow).length !== 0 && (
          <button
            onClick={() => setshowAlertReject(true)}
            className={"btnsRed"}
          >
            {`رد کردن دسته ای(${Object.keys(selectMultiRow).length})`}
          </button>
        )}
      </div>

      <div className={Styles["icon"]}>
        <FilterListIcon onClick={() => setFlagFilter((prev) => !prev)} />
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
          <ModalInsert
            // setcheckPhysical={setcheckPhysical}
            // checkPhysical={checkPhysical}
            setNewButton={setNewButton}
            apiGiftInsert={apiGiftInsert}
            reducerCategories={reducerCategories}
            reducerSubcategories={reducerSubcategories}
            change_gift_category_method={change_gift_category_method}
          />
        </Fade>
      </Modal>

      <AlertDialogSlide
        flagShow={showAlertFinaly}
        handleCloseAlert={setshowAlertFinaly}
        handleOkAlert={handleOkAlertfinaly}
        data={dataFinaly}
      />

      <AlertDialogSlide
        flagShow={showAlertReject}
        handleCloseAlert={setshowAlertReject}
        handleOkAlert={handleOkAlertReject}
        data={dataReject}
      />
    </div>
  );
}

const dataFinaly = {
  title: "نهایی کردن",
  description: "از نهایی کردن این رکوردها اطمینان دارید؟",
};

const dataReject = {
  title: "رد کردن",
  description: "از رد کردن این رکوردها اطمینان دارید؟",
};
