import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Pagination } from "@material-ui/lab";
import CardNoData from "../../../../Common/method/cardNoData";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { sepratePriceFromComma } from "../../../../Common/method/seprateNumberFromComma";
import { dateMiladiToShamsi } from "../../../../Common/method/date";

const useStyles = makeStyles({
  tableContainer: {
    direction: "rtl",
    borderRadius: 10,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto",
    marginTop: 30,
  },

  table: {
    maxHeight: "100px",
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
  icons: {
    width: "96.2%",
    margin: "auto",
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "white",
    padding: "5px 5px",
    position: "relative",
    top: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    "& span": {
      padding: "0 5px",
      cursor: "pointer",
    },
  },
  boxEmpty: {
    width: 24,
    height: 24,
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

let flag = false;

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};


const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 3, label: "تاریخ ثبت", title: "date_time", active: false },
  { id: 4, label: "نماد", title: "instrument_type", active: false },
  // { id: 5, label: "وضعیت درخواست", title: "is_canceled", active: false },
  // { id: 6, label: "منبع درخواست", title: "is_online", active: false },
  { id: 7, label: "قیمت", title: "average_price", active: false },
  { id: 8, label: "تعداد سهم", title: "quantity", active: false },
  { id: 9, label: "نوع درخواست", title: "trade_type", active: false },
  { id: 10, label: "مقدار", title: "total_value", active: false },
];

export default function SimpleTable({
  sort_agg,
  setSort_agg,
  pagination_agg,
  flagFilter,
  dataReducer,
  setMamber_id,
  setPagination_agg,
  stateReducerProfile,
  stateReducerSummaries,
  apiSelectOrderAggregates,
}) {
  const classes = useStyles();

  const [data, setDate] = useState([]);
  const [tableHeadState, setTableHeadState] = useState(tableHead);




  useEffect(() => {
    if (stateReducerProfile.data.length > 0) {
      let member_id = stateReducerProfile.data[0].id;
      setMamber_id(member_id)
    }
    return () => {
      setSort_agg({})
    }
  }, [stateReducerProfile.data])



  useEffect(() => {
    if (dataReducer.data) {
      let res = dataReducer.data;
      setDate(res);
    }
  }, [dataReducer]);


  const handleChangePagination = (event, value) => {
    setPagination_agg(value);
  };

  const handleClickSort = (title, id) => {

    if (!title) {
      alert("امکان فیلتر این ستون وجود ندارد.");
      return;
    }

    if (id === sort_agg.id) {
      let findState = findStateSort(title);
      if (findState === stateSort.DEFAULT) {
        setSort_agg({});
        return;
      }
      setSort_agg({ [title]: findState, id: id });
    } else {
      let res = tableHeadState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHeadState(res);
      setSort_agg({ [title]: stateSort.ASC, id: id });
    }
  };

  const findStateSort = (title) => {
    switch (sort_agg[title]) {
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

  useEffect(() => {
    if (flag) {
      apiSelectOrderAggregates(pagination_agg);
    }
    flag = true;
  }, [pagination_agg]);

  return (
    <div>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ height: flagFilter ? "50.5vh" : "70vh"  , marginBottom:15}}
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
                    sort_agg[item.title] === stateSort.ASC ? (
                      <ArrowUpwardIcon />
                    ) : sort_agg[item.title] === stateSort.DESC ? (
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
            {data &&
              data
                .map((row, ind) => (
                  <TableRow
                    key={ind}

                  >
                    <TableCell className="colorInherit" align="center">
                      {pagination_agg !== 1
                        ? pagination_agg * dataReducer.size -
                        dataReducer.size +
                        (ind + 1)
                        : ind + 1}
                    </TableCell>

                    <TableCell className="colorInherit" align="center">
                      {row.body.back_office_insert_date_time
                        ? dateMiladiToShamsi(row.body.back_office_insert_date_time.split(" ")[0])
                        : dateMiladiToShamsi(row.body.date_time.split(" ")[0])}
                    </TableCell>

                    <TableCell className="colorInherit" align="center">
                      {stateReducerSummaries.isinJson[row.body.instrument_id]
                        ? stateReducerSummaries.isinJson[row.body.instrument_id]
                        : row.body.instrument_type
                          ? row.body.instrument_type
                          : '-'}
                    </TableCell>

                    {/* <TableCell
                      className="colorInherit"
                      align="center"
                      style={{
                        color: row.body.is_canceled === "True" ? "red" : "",
                      }}
                    >
                      {row.body.is_canceled === "TRUE"
                        ? "لغو شده"
                        : row.body.is_canceled === "FALSE"
                          ? "لغو نشده"
                          : "-"}
                    </TableCell> */}
                    {/* <TableCell className="colorInherit" align="center">
                      {row.body.is_online === "FASLE" ? "آفلاین" : "آنلاین"}
                    </TableCell> */}
                    <TableCell className="colorInherit" align="center">
                      {row.body.average_price
                        ? sepratePriceFromComma(row.body.average_price)
                      :'-'}
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

        {data.length !== 0 ? ( 
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(dataReducer.total / dataReducer.size)}
              page={pagination_agg}
              onChange={handleChangePagination}
            />
          </div>
        ) : (
            <CardNoData />
          )}
      </TableContainer>

    </div>
  );
}

