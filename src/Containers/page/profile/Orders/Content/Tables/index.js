import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CardNoData from "./../../../../../Common/method/cardNoData";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { dateMiladiToShamsi } from "../../../../../Common/method/date";
import { sepratePriceFromComma } from "../../../../../Common/method/seprateNumberFromComma";

const useStyles = makeStyles({
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
  boxEmpty: {
    width: 24,
    height: 24,
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
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
});
const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "کد معاملاتی", title: "account", active: false },
  { id: 3, label: "تاریخ ثبت", title: "date_time", active: false },
  { id: 4, label: "نماد", title: "instrument_id", active: false },
  { id: 5, label: "وضعیت درخواست", title: "is_canceled", active: false },
  { id: 6, label: "منبع درخواست", title: "is_online", active: false },
  { id: 7, label: "قیمت", title: "price", active: false },
  { id: 8, label: "تعداد سهم", title: "quantity", active: false },
  { id: 9, label: "نوع درخواست", title: "trade_type", active: false },
  { id: 10, label: "مقدار", title: "total_value", active: false },
];

let flag = false;

export default function SimpleTable({
  flagFilter,
  stateReducerOreder,
  stateReducerSummaries,
  apiSubmitAggregates,
  stateReducerProfile,
  apiSubmitDetails,
  handelData,
  pageTab1,
  setPageTab1,
  apiSelectProfile,
  values,
  data,
  setData,
  setSort,
  sort,
}) {
  const classes = useStyles();
  const [state, setstate] = useState([]);

  const [tableHeadState, setTableHeadState] = useState(tableHead);

  useEffect(() => {
    if (stateReducerOreder.data) {
      let data = stateReducerOreder.data ? stateReducerOreder.data : [];
      setstate(data);
    }
  }, [stateReducerOreder.data]); //eslint-disable-line  react-hooks/exhaustive-deps

  // const handelSubmit = () => {
  //   let obj = handelData();
  //   let data = {
  //     ...obj,
  //   };
  //
  //   if (state[0]) {
  //     state[0].body.account
  //       ? apiSubmitDetails(stateReducerOreder.from + 20, data)
  //       : apiSubmitAggregates(stateReducerOreder.from + 20, data);
  //   }
  // };

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };
  useEffect(() => {
    let obj = handelData();
    // let member_id = stateReducerProfile?.data[0]?.id;

    if (data.report === "تجمیعی") {
      // if (pageTab1 !== 1) {
      //   setPageTab1(1);
      //
      //   return;
      // }
      let data = {
        ...obj,
      };

      if (flag) {
        apiSubmitAggregates(pageTab1, data);
      }
    }
    if (data.report === "عمومی") {
      // if (pageTab1 !== 1) {
      //   setPageTab1(1);
      //   return;
      // }
      let data = {
        ...obj,
      };

      apiSubmitDetails(pageTab1, data);
    }

    flag = true;
  }, [pageTab1]); //eslint-disable-line  react-hooks/exhaustive-deps

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
    <TableContainer
      className={classes.tableContainer}
      component={Paper}
      style={{ marginTop: 30, height: flagFilter ? "55vh" : "78vh" }}
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
          {state &&
            state?.map((row, ind) => (
              <TableRow
                key={ind}
                // className={classes.tableRow}
                // onClick={handleClickRow}
              >
                <TableCell className="colorInherit" align="center">
                  {pageTab1 !== 1
                    ? pageTab1 * stateReducerOreder.size -
                      stateReducerOreder.size +
                      (ind + 1)
                    : ind + 1}
                </TableCell>

                <TableCell className="colorInherit" align="center">
                  {row.body.account ? row.body.account : "-"}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.back_office_insert_date_time
                    ?dateMiladiToShamsi(row.body.back_office_insert_date_time.split(" ")[0]) 
                    : dateMiladiToShamsi(row.body.date_time.split(" ")[0])}
                </TableCell>

                <TableCell className="colorInherit" align="center">
                  {stateReducerSummaries.isinJson[row.body.instrument_id]
                    ? stateReducerSummaries.isinJson[row.body.instrument_id]
                    : row.body.instrument_id
                    ? row.body.instrument_id
                    : row.body.instrument_type}
                </TableCell>

                <TableCell
                  className="colorInherit"
                  align="center"
                  style={{
                    color: row.body.is_canceled === "True" ? "red" : "",
                  }}
                >
                  {row.body.is_canceled === "true"
                    ? "لغو شده"
                    : row.body.is_canceled === "False"
                    ? "لغو نشده"
                    : "-"}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.is_online ? "آفلاین" : "آنلاین"}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.price
                    ? sepratePriceFromComma(row.body.price)
                    : sepratePriceFromComma(row.body.average_price)}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.quantity}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.trade_type === "1" ? "خرید" : "فروش"}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row.body.value
                    ? row.body.value === "null"
                      ? "-"
                      : sepratePriceFromComma(row.body.value)
                    : sepratePriceFromComma(row.body.total_value)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {!state.length ? (
        <CardNoData />
      ) : (
        <div className={classes.stickyPagination}>
          <Pagination
            shape="rounded"
            variant="outlined"
            count={Math.ceil(
              stateReducerOreder.total / stateReducerOreder.size
            )}
            page={pageTab1}
            onChange={handleChangePagination}
          />
        </div>
      )}
    </TableContainer>
  );
}
