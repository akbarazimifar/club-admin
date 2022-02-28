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
import ButtonMarketer from "../../Marketer/ButtonMarketer";
import AlertDialogSlide from "../../../../Common/Components/AlertDialogSlide";
import "./index.scss";

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
    title: "sender_full_name",
    active: false,
  },
  { id: 3, label: "تلفن همراه", title: "sender_phone", active: false },
  { id: 4, label: "پست الکترونیکی", title: "sender_email", active: false },
  {
    id: 5,
    label: "متوسط گردش ماهیانه",
    title: "monthly_turnover",
    active: false,
  },
  {
    id: 6,
    label: "مدت زمان فعالیت در بازار سرمایه",
    title: "duration_activity",
    active: false,
  },
  {
    id: 7,
    label: "دلیل درخواست شعبه",
    title: "request_reasons",
    active: false,
  },
  {
    id: 8,
    label: "سوابق مدیریتی     ",
    title: "management_experiences",
    active: false,
  },
  { id: 9, label: "ابزار", title: "tools", active: false },
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
  const [tableHeadState, setTableHeadState] = useState(tableHead);


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
                  <TableCell className="colorInherit" align="center" style={{minWidth:"56px"}}>
                    {pageTab1 !== 1 ? pageTab1 * 50 - 50 + (ind + 1) : ind + 1}
                  </TableCell>
                  <TableCell className="colorInherit" align="center" style={{minWidth:"128px"}}>
                    {item.body.sender_full_name}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.sender_phone}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.sender_email}
                  </TableCell>
                  <TableCell className="colorInherit" align="center" style={{minWidth:"150px"}}>
                    {item.body.monthly_turnover}
                  </TableCell>
                  <TableCell className="colorInherit" align="center" style={{minWidth:"209px"}}>
                    {item.body.duration_activity}
                  </TableCell>
                  <TableCell className="colorInherit" align="center" style={{minWidth:"144px"}}>
                    {item.body.request_reasons}
                  </TableCell>
                  <TableCell 
                  className="colorInherit" 
                  align="center"
                  style={{maxWidth:"300px"}}>
                    {item.body.management_experiences}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    <ButtonMarketer
                      info={{
                        title: "ضمائم",
                        className: "btnsGreen",
                        modal: "ModalDetails",
                      }}
                      data={item.id}
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

      {/* {openAlert && (
        <AlertDialogSlide
          flagShow={openAlert}
          handleCloseAlert={setOpenAlert}
          handleOkAlert={handel_Submit_roll}
          data={{
            title: "ویرایش",
            description: `آیا میخواهید این رکورد را به ${status.value} تغییر وضعیت دهید؟`,
          }}
        />
      )} */}
    </>
  );
};

export default TableUsers;
