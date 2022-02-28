import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import { excel_action_list_all } from "../../../../boot/api/Excel/action";


import { EXCEL_GET_EMPTY } from "../../../../boot/api/typeActions";
import { EXCEL_GET_ISOK } from "../../../../boot/api/typeActions";

import Exlsx from './exlsx';

const useStyles = makeStyles({
  button: {
    borderRadius: "8px",
    padding:'5px 15px',
    marginTop:'1px',
    marginLeft:'15px',
    position: "relative",
    color:'#3D9970',
    border:'1px solid #3D9970',
    fontWeight:600,
    fontSize:'13px',
    '&:hover':{
      backgroundColor:'#3D9970',
      color:'white'
    }
  }
})


const Index = ({ filename, headers, handleExcelData, stateFilter, stateReducerExcel, tableApi, methodType, valueTab, methodType2, methodTypeNationId, methodTypeNationId2 }) => {

  const [state, setstate] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const classes = useStyles()

  const dispatch = useDispatch();





  const handlExcelFileBtn = () => {
    handleSubmitExcel();
  };




  const handleSubmitExcel = () => {
    dispatch({ type: EXCEL_GET_EMPTY });
    if (valueTab === 0) {


      let obj = {};

      Object.keys(stateFilter).forEach((element) => {
        if (stateFilter[element]) {
          obj[element] = stateFilter[element];
        }
      });



      if (!Object.keys(obj).length) {
        dispatch(
          excel_action_list_all(
            null,
            methodType,
            tableApi,
            valueTab
          )
        );
      } else {
        if (stateFilter.national_id) {
          if (methodTypeNationId) {
            dispatch(
              excel_action_list_all(
                obj,
                methodTypeNationId,
                tableApi,
                valueTab
              )
            );
          } else {
            dispatch(
              excel_action_list_all(
                obj,
                methodType,
                tableApi,
                valueTab
              )
            );
          }
        } else {
          dispatch(
            excel_action_list_all(
              obj,
              methodType,
              tableApi,
              valueTab
            )
          );
        }
      }
    } else {




      let obj = {};
      Object.keys(stateFilter).forEach((element) => {
        if (stateFilter[element]) {
          obj[element] = stateFilter[element];
        }
      });

      if (!Object.keys(obj).length) {
        dispatch(
          excel_action_list_all(
            null,
            methodType2,
            tableApi,
            valueTab
          )
        );
      } else {
        if (stateFilter.national_id) {
          if (methodTypeNationId2) {
            dispatch(
              excel_action_list_all(
                obj,
                methodTypeNationId2,
                tableApi,
                valueTab
              )
            );
          } else {
            dispatch(
              excel_action_list_all(
                obj,
                methodType2,
                tableApi,
                valueTab
              )
            );
          }
        } else {
          dispatch(
            excel_action_list_all(
              obj,
              methodType2,
              tableApi,
              valueTab
            )
          );
        }
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: EXCEL_GET_ISOK, payload: false })
  };
  useEffect(() => {
    if (stateReducerExcel.isOk) {
      setstate(true);
      setOpen(true);
    }
  }, [stateReducerExcel.isOk]);


  useEffect(() => {
    if (stateReducerExcel.loading) {
      setloading(true);
    } else {
      setloading(false);
    }
  }, [stateReducerExcel.loading]);

  useEffect(() => {
    return () => {
      dispatch({ type: EXCEL_GET_EMPTY });
    }
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handleExitExcel = () => {
    setstate(false);
    dispatch({ type: EXCEL_GET_ISOK, payload: false })
  };

  return (
    <Fragment>
      <Button
        // style={{
        //   marginRight: "15px",
        //   borderRadius: "8px",
        //   marginTop: "1px",
        //   position: "relative",
        //   color:'green',
        //   border:'1px solid green',
        //   "&:hover": {
        //     backgroundColor: "green",
        //     color:'white'
        //   },
        // }}
        className={classes.button}
        variant="outlined"

        disabled={loading}
        onClick={handlExcelFileBtn}
      >
        خروجی اکسل
        {loading && <CircularProgress style={buttonProgress} size={24} />}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">خروجی اکسل</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            آیا برای خروجی گرفتن مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            لغو
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            {state ? (
              <>
                {/* <CSVLink
              filename={filename ? filename + ".csv" : 'generatedBy_react.csv'}
                data={handleExcelData()}
                headers={headers}
                onClick={handleExitExcel}
              >
                تایید
              </CSVLink> */}
                <Exlsx
                 filename={filename ? filename  : 'generatedBy_react'}
                  handleExitExcel={handleExitExcel}
                  data={handleExcelData()}
                  headers={headers}
                />
              </>
            ) : null}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default Index;





let buttonProgress = {
  color: "green",
  position: "absolute",
  top: "50%",
  left: "50%",
  marginTop: -12,
  marginLeft: -12,
};
