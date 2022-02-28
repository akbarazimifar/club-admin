import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customer_v1_select_attachments_actions } from "../../../../boot/api/customersRequest/ModalRequest/action";
import { CUSTOMER_V1_SELECT_EMPTY } from "../../../../boot/api/typeActions";

const useStyles = makeStyles(() => ({
  modalDetail: {
    width: 930,
    borderRadius: 8,
    padding: 50,
    backgroundColor: "whitesmoke",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
  },
  content: {
    border: "1px dashed darkgray",
    padding: 15,
  },
}));

export default function ModalDetailsCustomer({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const stateReducer = useSelector(
    (state) => state.customer_v1_select_attachments_reducer
  );
  const [attachments, setattachments] = useState([]);

  useEffect(() => {
    dispatch(customer_v1_select_attachments_actions(data));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  // functions

  useEffect(() => {
    return () => {
      dispatch({ type: CUSTOMER_V1_SELECT_EMPTY })
    }
  }, []) //eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    if (stateReducer.data.length) {
      let attachment = stateReducer.data[0].body.attachments
        ? JSON.parse(stateReducer.data[0].body.attachments)
        : [];

      setattachments(attachment);
    }

  }, [stateReducer])

  return (
    <div className={classes.modalDetail}>
      <div style={{ width: "100%", display: "block", textAlign: "center" }}>
        {attachments
          ? attachments.map((itm, ind) => {
            return (
              <img
                style={{ margin: "10px 2.5%" }}
                display="block"
                width="45%"
                key={ind}
                src={`${
                  itm["File"]
                    ? itm["File"]
                    :`data:image/jpeg;base64,${itm['file-content']}` 

                  }`}
                id={"attachmentId" + ind + 1}
                alt=""
              />
            )
          }
          )
          : "ضمیمه‌ای وجود ندارد"}
      </div>
    </div>
  );
}
