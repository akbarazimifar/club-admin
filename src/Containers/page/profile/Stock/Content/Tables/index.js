import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CardNoData from "./../../../../../Common/method/cardNoData";
import { useDispatch, useSelector } from "react-redux";
import { select_stock_details } from "../../../../../../boot/api/profile/stock/stock_value/action";
import { sepratePriceFromComma } from "../../../../../Common/method/seprateNumberFromComma";
// import function from './../../../../staticPage/TelegramLink/Header/ModalAdd/Inputs/index';

const useStyles = makeStyles({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "auto",
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
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
  },
  noCard: {
    margin: 15,
  },
});

export default function SimpleTable({
  flagFilter,
  data,
  stateReducerSummaries,
  settotall,

}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const dataReducer = useSelector(
    (state) => state.select_stock_details_reducer
  );


  let obj = [];
  if (dataReducer.data.length !== 0) {
    obj = dataReducer.data;
  }

  const [state, setstate] = useState([]);

  useEffect(() => {
    if (data) setstate(data);
  }, [data]);

  let isins = data[0]?.body?.customer_stock_portfolio;

  const [arrayIsin, setarrayIsin] = useState([]);

  useEffect(() => {
    let a = [];
    if (isins) {
      Object.keys(isins).forEach((itm) => {
        a.push(itm);
        if (obj[data.SymbolISIN]) {
          sum(data.CurrentCount * obj[data.SymbolISIN]);
        }
      });
    }
    setarrayIsin(a);
  }, [state]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (arrayIsin.length) {
      dispatch(select_stock_details(arrayIsin));
    }
  }, [arrayIsin]); //eslint-disable-line react-hooks/exhaustive-deps

  let total = 0;
  const sum = (data) => {
    total = total + data;
    return total;
  };

  useEffect(() => {
    settotall(total);
  }, [sum]);

  return (
    <TableContainer
      className={classes.tableContainer}
      component={Paper}
      style={{ marginTop: 30, height: flagFilter ? "55vh" : "78vh" }}
    >
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead?.map((item, ind) => (
              <TableCell key={ind} className={classes.head} align="center">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {
          <TableBody>
            {dataReducer.data.length !== 0
              ? state.map((row) => {
                return Object.keys(row.body.customer_stock_portfolio).map(
                  (item, index) => {
                    let data = row.body.customer_stock_portfolio[item];

                    // console.log(
                    //   "sumReturnnn",

                    // );
                    // {

                    {
                      obj[data.SymbolISIN] &&
                        sum(data.CurrentCount * obj[data.SymbolISIN]);
                    }
                    return (
                      <TableRow key={index}>
                        <TableCell className="colorInherit" align="center">
                          {stateReducerSummaries.isinJson[data.SymbolISIN]
                            ? stateReducerSummaries.isinJson[data.SymbolISIN]
                            : data.SymbolISIN}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {data.CSDCount}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {data.CurrentCount}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {obj[data.SymbolISIN]
                            ? sepratePriceFromComma(obj[data.SymbolISIN])
                            : "-"}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <p style={{ color: "green" }}>
                              {data.OnBoardBuy}-
                            </p>
                            <p style={{ color: "red" }}>{data.OnBoardSell}</p>
                          </div>
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {sepratePriceFromComma(data.AverageBuyPrice)}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {sepratePriceFromComma(data.AverageSellPrice)}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {sepratePriceFromComma(data.TotalQuantityBuy)}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {sepratePriceFromComma(data.TotalQuantitySell)}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {sepratePriceFromComma(
                            data.CSDCount * obj[data.SymbolISIN]
                              ? data.CSDCount * obj[data.SymbolISIN]
                              : 0
                          )}
                        </TableCell>
                        <TableCell className="colorInherit" align="center">
                          {
                            // console.log("sggrfgdfgfdgfgfg",data.CurrentCount * obj[data.SymbolISIN])

                            sepratePriceFromComma(
                              data.CurrentCount * obj[data.SymbolISIN]
                                ? data.CurrentCount * obj[data.SymbolISIN]
                                : 0
                            )
                          }
                        </TableCell>
                      </TableRow>
                    );
                  }
                );
                {
                  sum();
                }
              })
              : null}
          </TableBody>
        }
      </Table>

      {data.length === 0 && <CardNoData />}
    </TableContainer>
  );
}

const tableHead = [
  "شناسه نماد ",
  "پرتفوی سپرده گذاری",
  "پرتفوی لحظه ای",
  "قیمت آخرین معامله (ریال)",
  "سفارشات باز (خرید - فروش)",
  "میانگین قیمت خرید امروز ",
  "میانگین قیمت فروش امروز ",
  "مجموع خرید امروز ",
  "مجموع فروش امروز ",
  "ارزش پرتفوی سپرده گذاری (ریال)",
  "ارزش پرتفوی لحظه‌ای (ریال) ",
];
