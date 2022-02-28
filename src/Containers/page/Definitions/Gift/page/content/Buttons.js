import { Box } from "@material-ui/core";
import React, { useState } from "react";
import AlertDialogSlide from "./../../../../../Common/Components/AlertDialogSlide";
import ModalCustom from "./../../../../../Common/Components/Modal";
import Deatils from "./details";
import { PostalCode } from "./postalCode";

export default function Buttons({
  row,
  apiCallUnregister,
  apiCallFinalize,
  checkPhysical,
  apiCallFinalizeSystem,
  apiCallSystemUnregister,
  handleClickPostalTrackingCode
}) {
  const [openAlertFinalize, setOpenAlertFinalize] = useState(false);
  const [openAlertUnregister, setOpenAlertUnregister] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openPostalCode, setOpenPostalCode] = useState(false);



  const getDateTimeCurrent = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    let dateCurrent = yyyy + "/" + mm + "/" + dd;

    return dateCurrent;
  };

  const handleOkAlertFinalize = () => {
    let giftType = row.body.gift_type;
    let dateRegister = row.body.registration_date.split(" ")[0];
    let dateCurrent = getDateTimeCurrent();

    if (giftType === "UP" || giftType === "BIMEH_SAMAN" || giftType === "DG") {
      if (dateRegister === dateCurrent) {
        alert("از درخواست شما یک روز باید بگذره");
      } else {
        apiCallFinalizeSystem(row.id);
      }
    } else {
      apiCallFinalize(row.id);
    }
    setOpenAlertFinalize(false);
  };

  const handleOkAlertUnregister = () => {
    let giftType = row.body.gift_type;
    let dateRegister = row.body.registration_date.split(" ")[0];
    let dateCurrent = getDateTimeCurrent();
    if (giftType === "UP" || giftType === "BIMEH_SAMAN" || giftType === "DG") {
      if (dateRegister === dateCurrent) {
        alert("از درخواست شما یک روز باید بگذره");
      } else {
        apiCallSystemUnregister(row.id);
      }
    } else {
      apiCallUnregister(row.id);
    }
    setOpenAlertUnregister(false);
  };

  return (
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" flexDirection="column">
      <Box>
        <button onClick={() => setOpenDetails(true)} className={`btnsBlue`}>
          جزئیات
      </button>

        <button
          onClick={() => {
            if (row.body.status === "SUBMITTED") {
              setOpenAlertFinalize(true);
            }
            else {
              alert("وضعیت در انتظار از این دکمه می توانید استفاده کنید");
            }
          }}
          className={`btnsGreen ${row.body.status === "SUBMITTED" ? "" : "disabledItems"}`}
        >
          نهایی کردن
      </button>
      </Box>
      <Box mt={1}>
        <button
          onClick={() => {
            if (row.body.status === "SUBMITTED") {
              setOpenAlertUnregister(true);
            }
            else {
              alert("وضعیت در انتظار از این دکمه می توانید استفاده کنید");
            }
          }}
          className={`btnsRed ${row.body.status === "SUBMITTED" ? "" : "disabledItems"}`}

        >
          رد کردن
      </button>

        <button
          onClick={() => {
            setOpenPostalCode(true);
          }}
          className="btnsBlue"
          className={`btnsBlue ${row.body.status === "FINALIZED" && row.body.gift_type === "PHYSICAL" ? "" : "disabledItems"}`}
        >
          کد رهگیری پستی
      </button>

      </Box>
      <ModalCustom open={openDetails} setOpen={setOpenDetails}>
        <Deatils data={row.body.gift_custom_data} />
      </ModalCustom>

      <ModalCustom open={openPostalCode} setOpen={setOpenPostalCode}>
        <PostalCode
          data={row.body.postal_tracking_code}
          id={row.id}
          handleClickPostalTrackingCode={(data) => {
            handleClickPostalTrackingCode(data)
            setOpenPostalCode(false)
          }}
        />
      </ModalCustom>

      {
        openAlertFinalize && (
          <AlertDialogSlide
            flagShow={openAlertFinalize}
            handleCloseAlert={setOpenAlertFinalize}
            handleOkAlert={handleOkAlertFinalize}
            data={dataAlertDialogSlideFinalize}
          />
        )
      }

      {
        openAlertUnregister && (
          <AlertDialogSlide
            flagShow={openAlertUnregister}
            handleCloseAlert={setOpenAlertUnregister}
            handleOkAlert={handleOkAlertUnregister}
            data={dataAlertDialogSlideUnregister}
          />
        )
      }
    </Box>
  );
}

const dataAlertDialogSlideFinalize = {
  title: "نهایی کردن",
  description: "از نهایی کردن این رکورد اطمینان دارید؟",
};

const dataAlertDialogSlideUnregister = {
  title: "لغو کردن",
  description: "از لغو این رکورد اطمینان دارید؟",
};
