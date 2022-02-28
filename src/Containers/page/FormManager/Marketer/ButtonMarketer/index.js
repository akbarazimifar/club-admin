import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AlertDialogSlide from "../../../../Common/Components/AlertDialogSlide";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import ModalDetailsCustomer from "../modals/ModalDetailsCustomer";
// import {customer_v1_remove_actions} from './../../../../boot/api/customersRequest/remove_customer/action'
import ModalMarketer_Attachments from './../ModalMarketer/index';

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
    ModalDetails: <ModalMarketer_Attachments data={data} />,
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
