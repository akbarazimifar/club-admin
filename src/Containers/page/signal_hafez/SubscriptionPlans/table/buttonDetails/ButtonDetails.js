import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { convertDigitToEnglish } from "../../../Common/method/convertDigitToEnglish";
import { notify_v1_actions_update } from "../../../../boot/api/Dossier/Notify/Notify_v1_update/action";
import { notify_v1_actions_delete } from "../../../../boot/api/Dossier/Notify/Notify_v1_delete/action";
import ModalEdit from "../../Dossier/Notify/Tables/ModalEdit";
import AlertDialogSlide from "../../../Common/Components/AlertDialogSlide";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalDetailsUsers from "../modals/ModalDetailsUsers";

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


  const Components = {
    ModalActive: <ModalDetailsUsers />,
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
