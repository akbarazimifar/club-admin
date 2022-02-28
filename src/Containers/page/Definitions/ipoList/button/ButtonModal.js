import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { CSVLink } from "react-csv";
import { EXCEL_GET_ISOK } from "../../../../../boot/api/typeActions";
import { Insert_activeIpo } from "../../../../../boot/api/Definitions/ipoLIst/insert_activeIpo/action";
import { useDispatch } from "react-redux";

const ButtonModal = ({ open, setOpen, active, id, method }) => {
  const dispatch = useDispatch();

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    // dispatch({type:EXCEL_GET_ISOK,payload:false})
  };
  const handelClick = (e) => {
    e.stopPropagation();
    dispatch(Insert_activeIpo(id, method));
    setOpen(false);
  };

  return (
    <>
      {/*<Button onClick={() => setOpen(!open)}>tudgdf</Button>*/}

      <Dialog
        open={open}
        onClose={(e) => handleClose(e)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">انجام عملیات</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {active
              ? "آیا میخواهید عرضه مورد نظر فعال شود؟"
              : "آیا میخواهید عرضه مورد نظر غیر فعال شود؟"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => handleClose(e)} color="primary">
            لغو
          </Button>
          <Button onClick={(e) => handelClick(e)} color="primary" autoFocus>
            تایید
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ButtonModal;
