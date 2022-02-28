import React, { useEffect, useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardNoData from "../../../Common/method/cardNoData";
import { makeStyles } from "@material-ui/core/styles";
import ButtonDetails from "../buttonDetails/ButtonDetails";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { toFixed } from './../../../Common/method/toFixed/index';

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
  iconClose: {
    width: 20,
    height: 20,
    fill: 'red',
    marginLeft: 10,
  },
}));

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نام", title: "first_name", active: false },
  { id: 3, label: "نام خانوادگی", title: "last_name", active: false },
  { id: 4, label: "کدملی", title: "national_id", active: false },
  { id: 5, label: "نقش", title: "category", active: false },
  { id: 6, label: "موبایل", title: "phone", active: false },
  { id: 7, label: "ایمیل", title: null, active: false },
  { id: 8, label: "کد معرفی", title: "automation_id", active: false },
  { id: 11, label: "شعبه", title: "branch_name", active: false },
  { id: 9, label: "امتیاز", title: "available_bonus", active: false },
  { id: 10, label: "ابزار", title: null, active: false },

  // "ردیف",
  // "نام",
  // "نام خانوادگی",
  // "کدملی",
  // "نقش",
  // "موبایل",
  // "ایمیل",
  // "کد معرفی",
  // "امتیاز",
  // "ابزار",
];
let flag = false;

export const branchName = (value, question) => {
  if (!question) {
    if (!value || value === "null") {
      return "-"
    }
    return value
  } else {
    if (!value || value === "null") {
      return (<svg style={{ width: 20, height: 20, fill: "red" }}>
        <use xlinkHref="/sprite.svg#close"></use>
      </svg>)
    }
    return (<svg style={{ width: 20, height: 20, fill: "green" }}>
      <use xlinkHref="/sprite.svg#check"></use>
    </svg>)
  }

}


const TableUsers = ({
  flagFilter,
  data,
  apiUsersListSelect,
  handleNull,
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
                    {handleNull(row.body.first_name)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.last_name)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.national_id)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.category}
                    {/*{row.body.category}*/}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.phone).replace('+', '')}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.email)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.ref_code)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {branchName(row.body.branch_name, "question")}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {toFixed(row.body.available_bonus)}
                    {/* {seprateNumberFromComma(row.body.available_bonus)} */}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    <ButtonDetails
                      info={{
                        title: "جزئیات",
                        className: "btnsGreen",
                        modal: "ModalDetails",
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
          //     onClick={() => apiUsersListSelect(data.from + 50)}
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
