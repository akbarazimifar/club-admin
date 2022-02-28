import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import AlertDialogSlide from "../../../../Common/Components/AlertDialogSlide";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ModalDetailsUsers from "../modals/ModalDetailsUsers";
import ModalInsertEdit from "../modals/ModalInsertEdit";
import { sector_v1_actions_update } from "../../../../../boot/api/stock/sector_data_stock/sector_v1_update/action";
import { sector_v1_actions_insert } from "../../../../../boot/api/stock/sector_data_stock/sector_v1_insert/action";

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


  ///////////////////////////////////delete///////////////////////////////
  const handelDelete = () => {
    // dispatch(notify_v1_actions_delete({ _id: data.id }));
    setNewButton(false);
  };
  /////////////////////////////////////////////////////////////////////////

  const handleSubmitEdit = (state, id) => {
    let obj = {}
    Object.keys(state).forEach(item => {
      if (item === "isin") return
      if (!state[item].label) {
        obj[item] = null
        return
      }
      obj[item] = state[item].label      
    })
    dispatch(sector_v1_actions_update({ ...obj, _id: id }))
    setNewButton(false)
  }

  const handleSubmitInsert = (data) => {
    let obj = {}
    Object.keys(data).forEach(item => {
      if (!data[item].label) {
        obj[item] = null
        return
      }
      obj[item] = data[item].label
    })
    dispatch(sector_v1_actions_insert(obj))
    setNewButton(false)
  }

  const Components = {
    ModalDetails: <ModalDetailsUsers data={data} />,
    ModalInsert: <ModalInsertEdit setNewButton={setNewButton} handleSubmitInsert={handleSubmitInsert} />,
    ModalInsertEdit: <ModalInsertEdit data={data} setNewButton={setNewButton} handleSubmitEdit={handleSubmitEdit} />,
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
