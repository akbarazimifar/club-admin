import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AlertDialogSlide from "../../../../Common/Components/AlertDialogSlide";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import ModalInsertEdit from "../modals/modalEdite/ModalInsertEdit";

import { handleAlertAndSelectApi, handleNoAnswarApi } from "../../../../Common/method/handleAlertAndSelectApi";
import { stockCash_remove } from "../../../../../boot/api/stock/stockCash/stockCash_Remove";


const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Index({ info, data, setflagApi }) {

  const classes = useStles();
  const dispatch = useDispatch();

  const [newButton, setNewButton] = useState(false);


  const handelDelete = () => {

    stockCash_remove({ _id: data.id })
      .then((res) => {
        handleAlertAndSelectApi(res.data, null, dispatch)
        if (res.data.response.error_code) {
          return
        }

        setTimeout(() => {
          setflagApi(prev => !prev)
          setNewButton(false)
        }, 1000);
      })
      .catch(() => {
      
        handleNoAnswarApi(dispatch)
      })

  };



  const Components = {
    ModalEdit: <ModalInsertEdit data={data} setNewButton={setNewButton} setflagApi={setflagApi} />,
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
          {/* <Fade in={newButton}>{Components['modalDelete']}</Fade> */}
        </Modal>
      )}
    </>
  );
}

const dataDelete = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟",
};
