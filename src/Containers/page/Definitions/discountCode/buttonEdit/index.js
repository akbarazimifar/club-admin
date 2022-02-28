import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core";
import ModalEdit from "./modalEdit/ModalEdit";

const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Index = ({ data, apiSelectdiscountCode }) => {
  const classes = useStles();
  const [flag, setflag] = useState(false);
  const [newButton, setNewButton] = useState(false);
  const handleClickButton = () => {
    setNewButton(false);
  };
  const handleClick = () => {
    setNewButton(true);
  };

  return (
    <>
      <button className="btnsYellow" onClick={handleClick}>
        ویرایش
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={newButton}
        onClose={() => handleClickButton()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={newButton}>
          <ModalEdit
            setNewButton={setNewButton}
            data={data}
            apiSelectdiscountCode={apiSelectdiscountCode}
          />
        </Fade>
      </Modal>
    </>
  );
};

export default Index;
