import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardNoData from "../../../../Common/method/cardNoData";
import { makeStyles } from "@material-ui/core/styles";
import { Button, LinearProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import ButtonWork from "../ButtonWork";
import AlertDialogSlide from "../../../../Common/Components/AlertDialogSlide";
import "../TableWork/index.scss";
import { workwithus_v1_update_actions } from "./../../../../../boot/api/FormManager/workWithUs/update/action";
import StatusMenu from './StatusMenu';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto",
    // marginTop:10,
  },

  table: {
    minWidth: 650,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10,
    marginTop: 5,
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px",
    },
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
  },
  modal: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "white",
    width: 600,
    margin: "auto",
    padding: theme.spacing(5),
    "& div": {
      width: 250,
    },
  },
  boxEmpty: {
    width: 24,
    height: 24,
  },
  btns: {
    margin: "40px 0 0 0",
    textAlign: "right",
    width: "100%",
  },
  stickyPagination: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    position: "sticky",
    bottom: 0,
    /* left: 0; */
    backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr",
  },
}));

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};
let flag = false;

const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  {
    id: 2,
    label: "نام و نام خانوادگی",
    title: null,
    active: false,
  },
  { id: 3, label: "تلفن همراه", title: null, active: false },
  { id: 4, label: "پست الکترونیکی", title: "sender_email", active: false },
  { id: 5, label: "موقعیت شغلی", title: "job_position", active: false },
  {
    id: 6,
    label: "زمان آخرین تغییر",
    title: "last_modified_date_time",
    active: false,
  },
  { id: 7, label: "وضعیت", title: "status", active: false },
  { id: 8, label: "ابزار", title: "tools", active: false },
];

const TableUsers = ({
  flagFilter,
  data,
  apiCostumerSelect,
  setPageTab1,
  pageTab1,
  setSort,
  sort,
  size,
  workwithusReducer,
  obj,
  sortRes,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tableHeadState, setTableHeadState] = useState(tableHead);
  const [openAlert, setOpenAlert] = useState(false);
  const [status, setStatus] = useState({ value: "", status: "" });
  const [id, setid] = useState();

  const changeStatusName = (status) => {
    switch (status) {
      case "SUBMITTED":
        return "بررسی نشده";
      case "FINALIZED":
        return "بررسی شده";
      case "REJECTED":
        return "رد شده";
    }
  };

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };


  const handleClickSort = (title, id) => {
    if (!title) {
      alert("امکان فیلتر این ستون وجود ندارد.");
      return;
    }

    if (id === sort.id) {
      let findState = findStateSort(title);
      if (findState === stateSort.DEFAULT) {
        setSort({});
        return;
      }
      setSort({ [title]: findState, id: id });
    } else {
      let res = tableHeadState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHeadState(res);
      setSort({ [title]: stateSort.ASC, id: id });
    }
  };

  const findStateSort = (title) => {
    switch (sort[title]) {
      case stateSort.DEFAULT:
        return stateSort.ASC;
      case stateSort.ASC:
        return stateSort.DESC;
      case stateSort.DESC:
        return stateSort.DEFAULT;
      default:
        return stateSort.DEFAULT;
    }
  };

  const handel_show_alert = (type, data) => {

    if (type !== data.body.status) {
      setStatus(findstatus(type));
      setid(data.id);
      setOpenAlert(true);
    }
  
  };

  const findstatus = (key) => {
    switch (key) {
      case "SUBMITTED":
        return { value: "بررسی نشده", status: "SUBMITTED" };
      case "FINALIZED":
        return { value: "بررسی شده", status: "FINALIZED" };
      case "REJECTED":
        return { value: "رد شده", status: "REJECTED" };
      default:
        break;
    }
  };



  const handel_Submit_roll = () => {
    dispatch(workwithus_v1_update_actions(id, status.status, size));
    setOpenAlert(false);
  };


  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 30, height: flagFilter ? "47vh" : "80vh" }}
      >

        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeadState?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                  onClick={() => handleClickSort(item.title, item.id)}
                >
                  {item.label}
                  {item.active ? (
                    sort[item.title] === stateSort.ASC ? (
                      <ArrowUpwardIcon />
                    ) : sort[item.title] === stateSort.DESC ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <svg className={classes.boxEmpty}></svg>
                    )
                  ) : (
                    <svg className={classes.boxEmpty}></svg>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!!data.data.length &&
              data.data.map((item, ind) => (
                <TableRow key={ind}>
                  <TableCell className="colorInherit" align="center">
                    {pageTab1 !== 1 ? pageTab1 * 50 - 50 + (ind + 1) : ind + 1}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.sender_full_name}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.sender_phone}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.sender_email}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.job_position}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.last_modified_date_time}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {changeStatusName(item.body.status)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center" style={{minWidth:300}}>
                    <ButtonWork
                    
                      info={{
                        title: "مشاهده ضمائم",
                        className: "btnsGreen",
                        modal: "ModalDetails",
                      }}
                      data={item.id}
                    />

                    <StatusMenu
                    handel_show_alert={handel_show_alert}
                    item={item}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {data.data.length !== 0 ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(data.total / data.size)}
              page={pageTab1}
              onChange={handleChangePagination}
            />
          </div>
        ) : !workwithusReducer.loading ? (
          <CardNoData />
        ) : null}

      </TableContainer>

      {openAlert && (
        <AlertDialogSlide
          flagShow={openAlert}
          handleCloseAlert={setOpenAlert}
          handleOkAlert={handel_Submit_roll}
          data={{
            title: "ویرایش",
            description: `آیا میخواهید این رکورد را به ${status.value} تغییر وضعیت دهید؟`,
          }}
        />
      )}
    </>
  );
};

export default TableUsers;
