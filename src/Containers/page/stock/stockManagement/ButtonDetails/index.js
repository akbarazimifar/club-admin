import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch } from 'react-redux';
import EditComponent from "./../insertOrEdit"
import { summaries_v1_actions_update } from "../../../../../boot/api/profile/summaries/stock_update_summaries/action";


const useStles = makeStyles(() => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));



export default React.memo(function Index({ info, data }) {

  const classes = useStles();
  let dispatch = useDispatch()
  const [newButton, setNewButton] = useState(false);

  const handleClickButton = () => {
    setNewButton((prev) => !prev);
  };

  const handleSubmitEdit = (data) => {
    dispatch(summaries_v1_actions_update(data))
  }

  return (
    <>
      <button
        className={info.className}
        style={{ marginTop: 10 }}
        onClick={() => handleClickButton()}
      >
        {info.title}{" "}
      </button>
      {info.modal && (
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
            <EditComponent data={data} handleClose={handleClickButton} handleSubmitEdit={handleSubmitEdit} />
          </Fade>
        </Modal>
      )}
    </>
  );
}

)