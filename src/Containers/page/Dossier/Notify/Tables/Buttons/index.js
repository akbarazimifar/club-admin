import React, { useState } from "react";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core";
import AlertDialogSlide from "./../../../../../Common/Components/AlertDialogSlide";
import { useDispatch } from "react-redux";
import ModalEdit from "../ModalEdit";
import ModalDetails from "../ModalDetails";
import { notify_v1_actions_update } from "../../../../../../boot/api/Dossier/Notify/Notify_v1_update/action";
import { convertDigitToEnglish } from "../../../../../Common/method/convertDigitToEnglish";
import { notify_v1_actions_delete } from "../../../../../../boot/api/Dossier/Notify/Notify_v1_delete/action";

const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Index({ info, data }) {
  const [newButton, setNewButton] = useState(false);
  const classes = useStles();
  const dispatch = useDispatch();

  ///////////////////////////////////update///////////////////////////////
  const handelSubmitUpdate = (date) => {
    let result = {
      start_time: convertDigitToEnglish(
        `${date.startDate} ${date.startTime.split(" ")[1]}`
      ),
      end_time: convertDigitToEnglish(
        `${date.endDate} ${date.endTime.split(" ")[1]}`
      ),
      _id: data.id,
    };

    dispatch(notify_v1_actions_update(result));
    setNewButton(false);
  };
  /////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////delete///////////////////////////////
  const handelDelete = () => {
    dispatch(notify_v1_actions_delete({ _id: data.id }));
    setNewButton(false);
  };
  /////////////////////////////////////////////////////////////////////////

  const Components = {
    ModalDetails: <ModalDetails data={data} />,
    ModalEdit: (
      <ModalEdit
        setNewButton={setNewButton}
        data={data}
        handelSubmitUpdate={handelSubmitUpdate}
      />
    ),
    modalDelete: (
      <AlertDialogSlide
        flagShow={newButton}
        handleCloseAlert={setNewButton}
        handleOkAlert={handelDelete}
        data={dataDelete}
      />
    ),
  };

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
  };

  return (
    <>
      <button
        className={info.className}
        style={{ marginTop: 10 }}
        onClick={() => {
          setNewButton(!newButton);
        }}
      >
        {info.title}{" "}
      </button>
      {info.modal && (
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
          <Fade in={newButton}>{Components[info.modal]}</Fade>
        </Modal>
      )}
    </>
  );
}

const dataDelete = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟",
};
