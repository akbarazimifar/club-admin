import React, { useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardNoData from "../../../Common/method/cardNoData";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { dateMiladiToShamsi } from "./../../../Common/method/date"

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

const checkNotNull = (value) => {
  if (!value || value === "null") {
    return "-"
  }
  return value
}

const checkPrice = (value) => {
  if (!value || value === "null") {
    return "-"
  }
  // return value
  return parseFloat(value.toFixed(2)).toLocaleString('en-US');
}

const checkDate = (value) => {
  if (!value || value === "null") {
    return "-"
  }
  return dateMiladiToShamsi(value.split(" ")[0])
}

const checkInstrumentType = (value) => {
  switch (value) {
    case "MORTGAGE":
      return "تسهیلات مسکن"
    case "ETF":
      return "صندوق سرمایه‌گذاری قابل معامله"
    case "BOND":
      return "اوراق قرضه"

    case "OPTION":
      return "اختیار"

    case "IFB":
      return "فرابورس"

    case "TSE":
      return "بورس"

    case "FUTURE":
      return "آتی"

    case "ENERGY":
      return "انرژی"

    case "IME":
      return "کالا"

    default:
      return "-"
  }
}

const checkOnline = (value) => {
  if (!value || value === "null") {
    return "-"
  }
  let lowerValue = value.toLowerCase()
  switch (lowerValue) {
    case "true":
      return "می باشد"
    case "false":
      return <span style={{ color: "red" }}>نمی باشد</span>
    default:
      return "-"
  }
}

const checkState = (value) => {
  switch (value) {
    case "NOT_PROCESSED":
      return "در انتظار"
    case "FINALIZED":
      return "ثبت شده"
    case "REJECTED":
      return "رد شده"
    default:
      return "-"
  }
}


const tableHead = [
  { label: "نام", title: "member_first_name", active: false, format: checkNotNull },
  { label: "نام خانوادگی", title: "member_last_name", active: false, format: checkNotNull },
  { label: "کدملی", title: "member_national_id", active: false, format: checkNotNull },
  { label: "مقدار تخفیف", title: "bonus_value", active: false, format: checkNotNull },
  { label: "تاریخ", title: "date_time", active: false, format: checkDate },
  { label: "نوع سهام", title: "instrument_type", active: false, format: checkInstrumentType },
  { label: "آنلاین", title: "is_online", active: false, format: checkOnline },
  { label: "کد حساب", title: "member_account_code", active: false, format: checkNotNull },
  { label: "وضعیت", title: "state", active: false, format: checkState },
  { label: "مجموع کمیسیون کارگزاری", title: "total_broker_commission", active: false, format: checkPrice },
  { label: "مجموع مقدار", title: "total_value", active: false, format: checkPrice },
]

const TableStepbystepDiscount = ({
  flagFilter,
  reducerData,
  pagination,
  setPagination,

}) => {
  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);

  const handleChangePagination = (event, value) => {
    setPagination(value);
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
              <TableCell
                className={classes.head}
                align="center"
              >
                ردیف
              </TableCell>
              {tableHeadState?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                >
                  {item.label}
                </TableCell>
              ))}
              {/* <TableCell
                className={classes.head}
                align="center"
              >
                جزئیات
              </TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {reducerData.data.length !== 0
              ? reducerData.data.map((row, ind) => (
                <TableRow key={ind}>
                  <TableCell className="colorInherit" align="center">
                    {pagination !== 1
                      ? pagination * reducerData.size - reducerData.size + (ind + 1)
                      : ind + 1}
                  </TableCell>

                  {
                    tableHeadState.map((coulmn, index) => {
                      let value = row.body[coulmn.title]
                      return (
                        <TableCell className="colorInherit" align="center" key={index}>
                          {coulmn.format ? coulmn.format(value) : value}
                        </TableCell>
                      )
                    })
                  }

                  {/* <TableCell className="colorInherit" align="center">
                    <ButtonDetails
                      info={{
                        title: "جزئیات",
                        className: "btnsGreen",
                        modal: "ModalDetails",
                      }}
                      data={row}
                    />
                  </TableCell> */}
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>

        {reducerData.data.length !== 0 ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(reducerData.total / reducerData.size)}
              page={pagination}
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

export default TableStepbystepDiscount;
