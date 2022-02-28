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
// import ButtonDetails from "../buttonDetails/ButtonDetails";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { seprateNumberFromComma } from "../../../../Containers/Common/method/seprateNumberFromComma"
import { dateMiladiToShamsi } from "../../../Common/method/date";


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
  { id: 4, label: "نام کاربری", title: "member_username", active: false },
  { id: 5, label: "کدملی", title: "member_national_id", active: false },
  { id: 6, label: "کد بورس", title: "member_bourse_code", active: false },
  { id: 7, label: "موبایل", title: "member_phone", active: false },
  { id: 8, label: "امتیاز", title: "member_available_bonus", active: false },
  { id: 9, label: "تاریخ و ساعت", title: "date", active: false },
  { id: 10, label: "تعداد ورود", title: "member_continuous_login_count", active: false },
  { id: 11, label: "شناسه اتوماسیون", title: "member_automation_id", active: false },
    { id: 12, label: "پلتفرم", title: "source", active: false },
    { id: 13, label: "وضعیت لاگین", title: "is_login", active: false },
];
let flag = false;
const TableUsers = ({
  flagFilter,
  data,
  apiUsersListSelect,
  handleNull,
  pageTab1,
  setPageTab1,
  setSort,
  sort,
  logInReducer
}) => {
  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);


  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };


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

  const findSource = (key) => {
    switch (key) {
      case 'CLUB':
        return 'باشگاه'
        break;
      case 'ADMIN':
        return 'ادمین'
      default:
        return '-'
    }
  }


  return (
    <>

      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 30, height: flagFilter ? "40vh" : "80vh" }}
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
            {logInReducer.data
              ? logInReducer.data.map((row, ind) => (
                <TableRow key={ind} style={row.body.is_login === 'TRUE'?{backgroundColor: '#f1fffc'}:{backgroundColor: '#fff1f1'}}>
                  <TableCell className="colorInherit" align="center">
                    {pageTab1 !== 1
                      ? pageTab1 * logInReducer.size - logInReducer.size + (ind + 1)
                      : ind + 1}

                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.member_first_name)} */}
                    {row.body.member_first_name}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.member_last_name)} */}
                    {row.body.member_last_name}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.member_last_name)} */}
                    {row.body.member_username}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.member_national_id)} */}
                    {row.body.member_national_id}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.member_national_id)} */}
                    {row.body.member_bourse_code}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.member_phone)} */}
                    {row.body.member_phone}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.member_phone)} */}
                    {row.body.member_available_bonus.toFixed(2)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.login_date)} */}
                    {row.body.date ? row.body.date.split(" ")[1].split(".")[0] : ''}
                    {" "}
                    {row.body.date ? dateMiladiToShamsi(row.body.date.split(" ")[0]) : "-"}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {/* {handleNull(row.body.login_date)} */}
                    {row.body.member_continuous_login_count}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.member_automation_id}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {findSource(row.body.source)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {
                      row.body.is_login === 'TRUE'
                      ? (<p style={{color:'green'}}>ورود</p>)
                      :(<p style={{color:'red'}} > خروج</p>)
                    }
                  </TableCell>
          
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>

        {logInReducer.data.length !== 0 ? (
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
              count={Math.ceil(logInReducer.total / logInReducer.size)}
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
