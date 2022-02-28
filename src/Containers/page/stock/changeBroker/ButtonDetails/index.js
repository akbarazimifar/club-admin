import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { changeBroker_v1_select_actions_Img } from './../../../../../boot/api/stock/changeBroker/actionImg';
import Card from './card';
import { useDispatch, useSelector } from 'react-redux';


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
  const [flag, setflag] = useState(false)
  const [newButton, setNewButton] = useState(false);
  const reducerChangeBroker = useSelector(state => state.changeBroker_v1_select_Reducer)

  const handleClickButton = (data) => {
    if (data === "NEW") {
      setNewButton((prev) => !prev);
    }
  };

  useEffect(() => {
    if (flag) {
      dispatch(changeBroker_v1_select_actions_Img({ _id: data.id }))
   
    }
  }, [flag])//eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(flag ){
      setNewButton(true)
    }
  }, [reducerChangeBroker.dataImg])//eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <button
        className={info.className}
        style={{ marginTop: 10 }}
        onClick={() => setflag(prev => !prev)}
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
          <Fade in={newButton}>
            <Card data={reducerChangeBroker.dataImg} setflag={setflag} setNewButton={setNewButton} />
          </Fade>
        </Modal>
      )}
    </>
  );
}

)