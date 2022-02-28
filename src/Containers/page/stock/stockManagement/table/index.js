import React, { useState, useEffect } from "react";
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
import ButtonDetails from "../ButtonDetails";
import { TableCellActive } from "./tableCellActive";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";


const checkIsActive = (value) => {
  if (value === "TRUE") return "فعال"
  else if (value === "FALSE") return "غیرفعال"
  else return "نامشخص"
}

const checkStockType = (value) => {
  switch (value) {
    case "MORTGAGE":
      return "تسهیلات مسکن"
    case "ETF":
      return "صندوق قابل معامله"
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
    case "null":
      return "-"
    default:
      return "نا مشخص"
  }
}

const checkFlow = (value) => {
  switch (value) {
    case "1":
      return "بورس"
    case "2":
      return "فرابورس"
    case "4":
      return "پایه"
    default:
      return "-"
  }
}

const tableColumn = [
  { id: "counter", label: "ردیف", title: null, active: false },
  { id: "isin", label: "شناسه سهم", title: null, active: false },
  { id: "back_office_id", label: "شناسه اتوماسیون", title: "isin", active: false },
  { id: "short_name", label: "نام مخفف", title: "request_date", active: false },
  { id: "full_name", label: "نام کامل", title: "state", active: false },
  { id: "sector_code", label: "کد صنعت", title: "description", active: false },
  { id: "sector_name", label: "نام صنعت", title: null, active: false },
  { id: "sub_sector_code", label: "کد زیرگروه", title: null, active: false },
  { id: "flow", label: "بازار", title: null, active: false, format: (value) => checkFlow(value) },
  { id: "stock_type", label: "نوع سهام", title: null, active: false, format: (value) => checkStockType(value) },
  { id: "is_active", label: "وضعیت", title: null, active: false, format: (value) => checkIsActive(value) },
  { id: "detailsEdit", label: "ابزار", title: null, active: false },
];

const countShow = 50


const useStyles = makeStyles((theme) => ({
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
    direction: "ltr"
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
    height: 24
  }
}));


const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHead1 = [
  { id: 1, label: "نمایش", title: null, active: false },
  { id: 1, label: "شناسه سهم", title: "isin", active: false },
  { id: 2, label: "شناسه اتوماسیون", title: "back_office_id", active: false },
  { id: 3, label: "نام مخفف", title: "short_name", active: false },
  {
    id: 4,
    label: "نام کامل",
    title: "full_name",
    active: false,
  },
  {
    id: 5,
    label: "کد صنعت",
    title: "sector_code",
    active: false,
  },
  {
    id: 6,
    label: "نام صنعت",
    title: "sector_name",
    active: false,
  },
  {
    id: 7,
    label: "کد زیرگروه",
    title: "sub_sector_code",
    active: false,
  },
  {
    id: 8,
    label: "بازار",
    title: "flow",
    active: false,
  },
  {
    id: 9,
    label: "نوع سهام",
    title: "stock_type",
    active: false,
  },
  {
    id: 10,
    label: "وضعیت",
    title: "is_active",
    active: false,
  },
  {
    id: 11,
    label: "ابزار",
    title: null,
    active: false,
  },
]

let flag = false

const TableUsers = ({
  flagFilter,
  data,
  setSort,
  sort,
  stateFilter
}) => {




  const classes = useStyles();
  const [pagination, setPagination] = React.useState(1)


  const [tableHeadState, setTableHeadState] = useState(tableHead1);


  const handleChangePagination = (event, value) => {
    setPagination(value);
  };


  const handleNoCard = () => {

let text = null;

    if (flag) {
      text = 'داده یافت نشد'
    } else {
      text = "در حال پردازش اطلاعات..."
      return <CardNoData value={text} />
    }

      return <CardNoData value={text} />

  }

  useEffect(()=>{
    setTimeout(() => {
      flag = true
    }, 5000);
  },[])


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
        style={{ marginTop: 30, height: flagFilter ? "49vh" : "80vh" }}
      >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeadState?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                // onClick={() => handleSortTable(ind, item)}
                // onClick={() => handleClickSort(item.title, item.id)}
                >
                  {item.label}
                  {/* {item.active ? (
                  sort[item.title] === stateSort.ASC ? (
                    <ArrowUpwardIcon />
                  ) : sort[item.title] === stateSort.DESC ? (
                    <ArrowDownwardIcon />
                  ) : (
                    <svg className={classes.boxEmpty}></svg>
                  )
                ) : (
                  <svg className={classes.boxEmpty}></svg>
                )} */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data
                .slice((pagination - 1) * countShow, pagination * countShow)
                .map((row, ind) => {
                  return (
                    <>
                      <TableRow key={ind}>
                        <TableCell className="colorInherit" align="center">
                          {pagination !== 1 ? ((pagination - 1) * countShow) + (ind + 1) : ind + 1}
                        </TableCell>
                        {
                          tableColumn
                            // .filter((item, in) => in !== 0 )
                            .filter((item, indexFilter) => indexFilter !== 0 && indexFilter + 1 !== tableColumn.length && indexFilter + 2 !== tableColumn.length)
                            .map((column, index) => {
                              let value = row.body[column.id];
                              return (
                                <TableCell key={index} className="colorInherit" align="center">
                                  {
                                    column.format ? column.format(value) : value
                                  }
                                </TableCell>
                              )
                            })
                        }
                        <TableCell className="colorInherit" align="center">
                          <TableCellActive row={row} />
                        </TableCell>

                        <TableCell className="colorInherit" align="center">
                          <ButtonDetails
                            info={{
                              title: "ویرایش",
                              className: "btnsGreen",
                              modal: true,
                            }}
                            data={row}
                          />
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })
              : null}
          </TableBody>
        </Table>

        {
          data.length !== 0 ? (
            <div className={classes.stickyPagination}>
              <Pagination
                shape="rounded"
                variant="outlined"
                count={Math.ceil(data.length / countShow)}
                page={pagination}
                onChange={handleChangePagination}
              />
            </div>
          ) : (
              handleNoCard()
            )
        }

      </TableContainer>
    </>
  );
};

export default TableUsers;
