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
import ButtonDetails from "../buttonDetails/ButtonDetails";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";

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

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const checkNotNull = (value) => {
  if(!value || value === "null"){
    return "-"
  }
  return value
}

const checkPrice = (value) => {
  if(!value || value === "null"){
    return "-"
  }
  // return value
  return parseFloat(value.toFixed(2)).toLocaleString('en-US');
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

const tableHead = [
  { label: "شناسه نماد", title: "isin", active: false, format : checkNotNull},
  { label: "نام مخفف نماد", title: "18_char_persian_symbol", active: false , format : checkNotNull},
  { label: "نام کامل شرکت", title: "30_char_persian_symbol", active: false, format : checkNotNull },
  { label: "حداکثر قیمت مجاز", title: "max_permitted_price", active: false, format: checkPrice },
  { label: "حدااقل قیمت مجاز", title: "min_permitted_price", active: false, format: checkPrice },
  { label: "حجم مبنا", title: "base_volume", active: false, format: checkPrice },
  { label: "بازار", title: "flow", active: false , format : checkFlow },
  { label: "تعداد سهام", title: "total_company_quantity", active: false, format: checkPrice },
  { label: "کد گروه نماد", title: "symbol_group_code", active: false , format : checkNotNull},
  { label: "کد گروه صنعت", title: "sector_code", active: false , format : checkNotNull},
]

let flag = false;
const TableUsers = ({
  flagFilter,
  data,
  apiUsersListSelect,
  pageTab1,
  setPageTab1,
  setSort,
  sort,
}) => {
  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };

  useEffect(() => {
    if (flag) {
      apiUsersListSelect(pageTab1);
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
        item.title === id ? { ...item, active: true } : { ...item, active: false }
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
              <TableCell
                className={classes.head}
                align="center"
              // onClick={() => handleSortTa\ble(ind, item)}
              >
                ردیف
              </TableCell>
              {tableHeadState?.map((item, ind) => (
                <TableCell
                  key={ind}
                  className={classes.head}
                  align="center"
                  // onClick={() => handleSortTa\ble(ind, item)}
                  onClick={() => handleClickSort(item.title, item.title)}
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
              <TableCell
                className={classes.head}
                align="center"
              // onClick={() => handleSortTa\ble(ind, item)}
              >
                جزئیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.length !== 0
              ? data.data.map((row, ind) => (
                <TableRow key={ind}>
                  <TableCell className="colorInherit" align="center">
                    {pageTab1 !== 1
                      ? pageTab1 * data.size - data.size + (ind + 1)
                      : ind + 1}
                  </TableCell>

                  {
                    tableHeadState.map((coulmn,index) => {
                      let value = row.body[coulmn.title]
                      return (
                        <TableCell className="colorInherit" align="center" key={index}>
                          {coulmn.format ? coulmn.format(value) : value}
                        </TableCell>
                      )
                    })
                  }

                  <TableCell className="colorInherit" align="center">
                    <ButtonDetails
                      info={{
                        title: "جزئیات",
                        className: "btnsGreen",
                        modal: "ModalDetails",
                      }}
                      data={row}
                    />

                    <ButtonDetails
                      info={{
                        title: "ویرایش",
                        className: "btnsBlue",
                        modal: "ModalInsertEdit",
                      }}
                      data={row}
                    />
                  </TableCell>
                </TableRow>
              ))
              : null}
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
        ) : (
          <CardNoData />
        )}
      </TableContainer>
    </>
  );
};

export default TableUsers;
