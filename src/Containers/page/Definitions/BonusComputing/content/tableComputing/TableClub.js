import React, { useEffect, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardNoData from "../../../../../Common/method/cardNoData";
import { makeStyles } from "@material-ui/core/styles";
import { dateMiladiToShamsi } from "../../../../../Common/method/date";

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


export default function TableUsers({
  reduserUser
}) {

  const tableHead = [
    { id: 1, label: "ردیف", title: null, active: false },
    { id: 2, label: "تاریخ اعمال", title: "closing_date", active: false },
    { id: 3, label: "کدملی", title: "member_national_id", active: false },
    { id: 8, label: "مقدار", title: "value", active: false },
  ];


  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);


  const handleNull = (data) => {
    return data
  }


  return (
    <>

        <Table stickyHeader className={classes.table} >
          <TableHead>
            <TableRow>
              {tableHeadState?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                >
                  {item.label}

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reduserUser.data.length > 0
              ? reduserUser.data[0].body.DAILY_TURNOVER_SCORE.records_club
                .map((row, ind) => (
                  <TableRow key={ind}>
                    <TableCell className="colorInherit" align="center">
                      {ind + 1}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {row.Date ? dateMiladiToShamsi(row.closing_date.split(' ')[0]) : '-'}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.member_national_id)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.value)}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>

        {
          reduserUser.data.length === 0
            ?  <CardNoData value={reduserUser.loadin ?'در حال بارگذاری...':null}/>
            : reduserUser.data[0].body.DAILY_TURNOVER_SCORE.records_club.length === 0
              ?  <CardNoData value={reduserUser.loadin ?'در حال بارگذاری...':null}/>
              : ''
        }

    </>
  );
};


