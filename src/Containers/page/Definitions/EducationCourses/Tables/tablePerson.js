import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Buttons from "./Buttons";
import CardNoData from "./../../../../Common/method/cardNoData";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { Pagination } from "@material-ui/lab";
import { dateMiladiToShamsi } from "../../../../Common/method/date";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflow: "auto",
    width: "96.2%",
    margin: "auto",
    // marginTop:10,
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
    width: 15,
    height: 15,
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

const tableHeadStart = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نام", title: null, active: false },
  { id: 3, label: "نام خانوادگی", title: null, active: false },
  { id: 4, label: "کد ملی", title: null, active: false },
  { id: 5, label: "عنوان آموزش", title: null, active: false },
  { id: 6, label: " تاریخ ثبت نام", title: "registration_date", active: false },
  { id: 7, label: "وضعیت ثبت نام", title: "status", active: false },
  {
    id: 8,
    label: "وضعیت امتیاز ثبت  نام",
    title: "register_bonus_id",
    active: false,
  },
  { id: 9, label: "وضعیت امتیاز لغو", title: null, active: false },
  { id: 9, label: "ابزار", title: null, active: false },
];

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};
let flag = false;

export default function SimpleTable({
  flagFilter,
  reducerRegistration,
  handleClickMore,
  apiCallSelectRegistration,
  setPaginationRegistration1,
  paginationRegistration1,
  setSort1,
  sort1,
}) {
  const [tableHead, setTableHead] = useState(tableHeadStart);

  const classes = useStyles();

  const handleClickSort = (title, id) => {
    if (!title) {
      alert("امکان فیلتر این ستون وجود ندارد.");
      return;
    }

    if (id === sort1.id) {
      let findState = findStateSort(title);
      if (findState === stateSort.DEFAULT) {
        setSort1({});
        return;
      }
      setSort1({ [title]: findState, id: id });
    } else {
      let res = tableHead.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHead(res);
      setSort1({ [title]: stateSort.ASC, id: id });
    }
  };

  const findStateSort = (title) => {
    switch (sort1[title]) {
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
    setPaginationRegistration1(value);
  };

  useEffect(() => {
    if (flag) apiCallSelectRegistration();

    flag = true;
  }, [paginationRegistration1]);

  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 30, height: flagFilter ? "59vh" : "80vh" }}
      >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                  onClick={() => handleClickSort(item.title, item.id)}
                >
                  {item.label}
                  {item.active ? (
                    sort1[item.title] === stateSort.ASC ? (
                      <ArrowUpwardIcon />
                    ) : sort1[item.title] === stateSort.DESC ? (
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
            {reducerRegistration.data.map((row, ind) => (
              <TableRow
                key={ind}
                // className={classes.tableRow}
                // onClick={handleClickRow}
              >
                <TableCell className="colorInherit" align="center">
                  {ind + 1}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.member_first_name}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.member_last_name}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.member_national_id}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.course_name}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {dateMiladiToShamsi(row.body.registration_date.split(" ")[0])}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.status === "SUBMITTED"
                    ? "در انتظار"
                    : row.body.status === "CANCELED"
                    ? "لغو شده"
                    : "نهایی شده"}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.register_bonus_id === "null"
                    ? "-"
                    : row.body.register_bonus_id === "FREE"
                    ? "رایگان"
                    : "نهایی شده"}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.unregister_bonus_id === "null"
                    ? "-"
                    : row.body.unregister_bonus_id === "FREE"
                    ? "رایگان"
                    : "نهایی شده"}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.status === "SUBMITTED" ? (
                    <Buttons
                      info={{
                        title: "لغو ثبت نام",
                        className: "btnsYellow",
                        modal: "AlertDialogSlideAvtivationRegistration",
                      }}
                      dataRow={row}
                    />
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {reducerRegistration.data.length !== 0 ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(
                reducerRegistration.total / reducerRegistration.size
              )}
              page={paginationRegistration1}
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
