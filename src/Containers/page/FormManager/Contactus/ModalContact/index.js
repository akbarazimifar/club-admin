import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CONTACT_US_V1_SELECT_DETAILS_EMPTY } from "../../../../../boot/api/typeActions";
import { contactus_v1_select_details_actions } from "./../../../../../boot/api/Form Manager/Contactus/Details/action";
import { CircularProgress } from "@material-ui/core";
import { TextField, Box } from "@material-ui/core";
import { contactus_v1_update_actions } from "../../../../../boot/api/Form Manager/Contactus/update/action";

const useStyles = makeStyles(() => ({
  modalDetail: {
    width: 930,
    borderRadius: 8,
    padding: 30,
    backgroundColor: "whitesmoke",
    maxHeight: 797,
    minWidth: 600,
    overflow: "auto",
  },
  content: {
    border: "1px dashed darkgray",
    padding: 15,
  },
  LinearProgress: {
    width: "100%",
  },
}));

export default function Modalcontactus_details({
  data,
  setNewButton,
  newButton,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [valueInsert, setValueInsert] = useState({
    response: "",
  });

  const stateReducer = useSelector(
    (state) => state.contactus_v1_select_details_reducer
  );

  const [dataReducer, setdataReducer] = useState([]);

  useEffect(() => {
    dispatch(contactus_v1_select_details_actions(data));
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: CONTACT_US_V1_SELECT_DETAILS_EMPTY });
    };
  }, []);

  useEffect(() => {
    if (stateReducer.data.length) {
      setdataReducer(stateReducer.data[0]?.body);
    } else {
    }
  }, [stateReducer]);

  const handleChangeValueInsert = (value, type) => {
    setValueInsert((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleUpdateApi = (data, id) => {
    dispatch(contactus_v1_update_actions(data, id));
    setNewButton(!newButton);
  };

  const handleExit = () => {
    setNewButton(!newButton);
  };

  return (
    <div className={classes.modalDetail}>
      {stateReducer.loading && (
        <CircularProgress className={classes["LinearProgress"]} />
      )}

      <h4>{dataReducer.title}</h4>
      <p>{dataReducer.content}</p>

      {dataReducer.status === "SUBMITTED" && (
        <Box>
          <TextField
            placeholder="پاسخ"
            multiline
            fullWidth
            variant="outlined"
            rows={5}
            rowsMax={11}
            value={valueInsert.response}
            onChange={(e) =>
              handleChangeValueInsert(e.target.value, "response")
            }
          />
          <Button
            className={"btnsGreen"}
            style={{ marginTop: "10px" }}
            onClick={() => handleUpdateApi(valueInsert.response, data)}
          >
            ارسال
          </Button>
          <button
            className={"btnsRed"}
            style={{ marginTop: "10px", marginRight: "10px" }}
            onClick={() => handleExit()}
          >
            انصراف
          </button>
        </Box>
      )}

      {dataReducer.status === "ANSWERED" && (
        <p>{"پاسخ: " + dataReducer.response}</p>
      )}
    </div>
  );
}
