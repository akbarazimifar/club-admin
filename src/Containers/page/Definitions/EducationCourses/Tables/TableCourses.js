import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CardNoData from "../../../../Common/method/cardNoData";
import Buttons from "./Buttons";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { Pagination } from "@material-ui/lab";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import { Box, Button, Modal, Typography } from "@material-ui/core";
import ModalPerson from "./modalPerson";

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

  table: {
    minWidth: 650,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
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
  btns: {
    margin: "40px 0 0 0",
    textAlign: "right",
    width: "100%",
  },
  boxEmpty: {
    width: 24,
    height: 24,
  },
  btnModal: {
    border: "1px solid #3D9970",
    borderRadius: 4,
    marginTop: 10,
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 12,
    color: "#3D9970",
    height: 30,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    boxShadow: "0 0 10px rgb(204, 204, 204)",
    "&:hover": {
      backgroundColor: "#3D9970",
      color: "white",
    },
  },
}));

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHeadStart = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "کد دوره", title: null, active: false },
  { id: 2, label: "عنوان آموزش", title: null, active: false },
  { id: 3, label: "وضعیت", title: "is_active", active: false },
  { id: 4, label: "تاریخ شروع دوره", title: null, active: false },
  { id: 5, label: "روز های برگزاری", title: null, active: false },
  { id: 6, label: "تعداد ساعت", title: "hours", active: false },
  { id: 7, label: "تاریخ پایان دوره", title: null, active: false },
  { id: 8, label: "دسته بندی", title: "category", active: false },
  { id: 9, label: "ظرفیت مانده", title: "remained_capacity", active: false },
  { id: 9, label: "ابزار", title: null, active: false },
];

let flag = false;
export default function SimpleTable({
  flagFilter,
  data,
  apiCoursesUpdate,
  apiCoursesDeactive,
  apiCoursesActive,
  sort,
  setSort,
  setPaginationRegistration,
  apiCoursesSelect,
  paginationRegistration,
  Courses_Reducer,
}) {
  const classes = useStyles();
  const [tableHead, setTableHead] = useState(tableHeadStart);

  const [open, setopen] = useState({
    flag: false,
    ind: "",
    id: "",
  });

  //   const tableHead = [
  //     "ردیف",
  //     "عنوان آموزش",
  //     "وضعیت",
  //     "تاریخ شروع دوره",
  //     "روزهای برگزاری",
  //     "تعداد ساعت",
  //     "تاریخ پایان دوره",
  //     "دسته بندی",
  //     "ظرفیت مانده",
  //     "ابزار",
  //   ];

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
      let res = tableHead.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHead(res);
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

  const handleChangePagination = (event, value) => {
    setPaginationRegistration(value);
  };

  useEffect(() => {
    if (flag) apiCoursesSelect();

    flag = true;
  }, [paginationRegistration]);

  const handleOpen = (ind, id) => {
    setopen({
      flag: true,
      ind: ind,
      id: id,
    });
  };

  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 30, height: flagFilter ? "54vh" : "80vh" }}
      >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                  // onClick={() => handleSortTa\ble(ind, item)}
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
            {data.map((row, ind) => (
              <TableRow
                key={ind}
              // className={classes.tableRow}
              // onClick={handleClickRow}
              >
                <TableCell className="colorInherit" align="center">
                  {ind + 1}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.id}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.Name}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.is_active === "TRUE" ? "فعال" : "غیر فعال"}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.start_date[0] === "2"
                    ? dateMiladiToShamsi(row.body.start_date.split("T"[0]))
                    : row.body.start_date}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.holding_days}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.hours}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.end_date[0] === "2"
                    ? dateMiladiToShamsi(row.body.end_date.split("T"[0]))
                    : row.body.end_date}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.category}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {
                    row.body.remained_capacity < 0 ? 0 : row.body.remained_capacity
                  }
                </TableCell>
                <TableCell
                  className="colorInherit"
                  // align="center"
                  style={{
                    display: "flex",
                    height: "93px",
                    minWidth: 390,
                    // justifyContent: "center",
                    alignItems: "center",

                  }}
                >
                  <button
                    style={{ marginTop: 10 }}
                    onClick={() => handleOpen(ind, row.id)}
                    // className={classes.btnModal}
                    className={'btnsBlue'}
                  >
                    ثبت نام کننده ها
                  </button>
                  {open.flag && open.ind === ind && (
                    <ModalPerson open={open} setopen={setopen} index={ind} />
                  )}
                  <Buttons
                    info={{
                      title: "ویرایش",
                      className: "btnsYellow",
                      modal: "ModalEdit",
                    }}
                    data={row}
                    apiCoursesUpdate={apiCoursesUpdate}
                  />

                  <Buttons
                    info={{
                      title:
                        row.body.is_active === "TRUE" ? "غیر فعال" : "فعال",
                      className:
                        row.body.is_active === "TRUE" ? "btnsRed" : "btnsGreen",
                      modal: "modalDelete",
                    }}
                    data={row}
                    apiCoursesDeactive={apiCoursesDeactive}
                    apiCoursesActive={apiCoursesActive}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {Courses_Reducer.data.length !== 0 ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(Courses_Reducer.total / Courses_Reducer.size)}
              page={paginationRegistration}
              onChange={handleChangePagination}
            />
          </div>
        ) : (
            <CardNoData />
          )}
      </TableContainer>
    </>
  );
}
