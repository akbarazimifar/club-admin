import React, { useEffect, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardNoData from "../../../../Common/method/cardNoData";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import {sepratePriceFromComma} from '../../../../Common/method/seprateNumberFromComma';

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

const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نام", title: "member_first_name", active: false },
  { id: 3, label: "نام خانوادگی", title: "member_last_name", active: false },
  { id: 4, label: "کدملی", title: "member_national_id", active: false },
  { id: 5, label: "عنوان جایزه", title: null, active: false },
  { id: 6, label: "مبلغ", title: "online_charge_amount", active: false },
  { id: 7, label: "امتیاز مورد نیاز", title: "online_charge_required_bonus", active: false },
  { id: 8, label: "تاریخ", title: "registration_date", active: false },
  { id: 9, label: "وضعیت", title: "status", active: false },


];

let flag = false;

const TableUsers = ({
  flagFilter,
  data,
  apiSubmitSelect,
  handleNull,
  pageTab1,
  setPageTab1,
  setSort,
  sort,
}) => {

  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);

  const findStatus = (key) => {
    switch (key) {
      case "SUBMITTED":
        return "در انتظار"
      case "REJECTED":
        return "لغو شده"
      case "FINALIZED":
        return "نهایی شده"
      default:
        return "نامشخص"
    }
  };


  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };

  useEffect(() => {
    if (flag) {
      apiSubmitSelect(pageTab1);
    }
    flag = true;
  }, [pageTab1]); //eslint-disable-line react-hooks/exhaustive-deps



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
            {data.data
              ? data.data.map((row, ind) => (
                <TableRow key={ind}>
                  <TableCell className="colorInherit" align="center">
                    {pageTab1 !== 1
                      ? pageTab1 * data.size - data.size + (ind + 1)
                      : ind + 1}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.member_first_name)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.member_last_name)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.member_national_id)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.online_charge_name)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                   {sepratePriceFromComma(row.body.online_charge_amount)}ریال 
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.online_charge_required_bonus)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.registration_date ? dateMiladiToShamsi(row.body.registration_date.split(' ')[0]) : '-'}
                    {/* {row.body.registration_date ? row.body.registration_date.split(' ')[0] : '-'} */}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {findStatus(row.body.status)}
                  </TableCell>
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>

        {data.data.length !== 0 ? (
          // <p
          //   style={{
          //     textAlign: "center",
          //     fontWeight: "bold",
          //     direction: "rtl",
          //   }}
          // >
          //   <span
          //     style={{ cursor: "pointer", color: "#198cf0" }}
          //     // onClick={() => apiNotifyselect(notify_reducer.from + 20)}
          //     onClick={() => apiSubmitSelect(data.from + 50)}
          //   >
          //     بارگذاری موارد بیشتر...
          //   </span>
          // </p>

          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(data.total / data.size)}
              page={pageTab1}
              onChange={handleChangePagination}
            />
          </div>
        ) : (
            <CardNoData />
          )}
      </TableContainer>
    </>
  );
};

export default TableUsers;
