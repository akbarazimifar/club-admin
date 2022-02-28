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
import ButtonDetails from "../ButtonDetailsCustomer/ButtonDetailsCustomer";
import { LinearProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
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
    marginTop: 5,
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
  // loading: {
  //   position: "fixed",
  //   right: "2%",
  //   width: "83%"
  // },
}));

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};
let flag = false;

const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  // { id: 2, label: "شناسه باشگاه", title: "member_id", active: false },
  { id: 3, label: "نام", title: "member_first_name", active: false },
  { id: 4, label: "نام خانوادگی", title: "member_last_name", active: false },
  { id: 5, label: "کدملی", title: "member_national_id", active: false },
  { id: 6, label: "تاریخ ثبت درخواست", title: "date_time", active: false },
  { id: 7, label: "شناسه ثبت نام", title: "registration_id", active: false },
  { id: 7, label: "توضیحات", title: null, active: false },
  { id: 8, label: "وضعیت", title: "status", active: false },
  { id: 9, label: "ضمائم", title: null, active: false },
];

const TableUsers = ({
  flagFilter,
  data,
  apiCostumerSelect,
  customerReducer,
  setPageTab1,
  pageTab1,
  setSort,
  sort,
}) => {
  const classes = useStyles();

  const [tableHeadState, setTableHeadState] = useState(tableHead);


  const findStatus = (status) => {
    switch (status) {
      case "REJECTED":
        return "رد شده";
      case "REGISTERED":
        return "ثبت در اتوماسیون";
      case "FINALIZED":
        return "اتمام ثبت‌نام";
      case "NOT_PROCESSED":
        return "در انتظار";
      default:
        return "نامشخص";
    }
  };

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };

  useEffect(() => {
    if (flag) {
      apiCostumerSelect(pageTab1);
    }
    flag = true;
  }, [pageTab1]); //eslint-disable-line react-hooks/exhaustive-deps

  const findRegistrationId = (registration_id) => {
    switch (registration_id) {
      case "null":
        return "-";
      default:
        return registration_id;
    }
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

  // arrays

  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 30, height: flagFilter ? "47vh" : "80vh" }}
      >
        {customerReducer.loading && <LinearProgress />}

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
            {!!customerReducer.data.length &&
              customerReducer.data.map((item, ind) => (
                <TableRow key={ind}>
                  <TableCell className="colorInherit" align="center">
                    {pageTab1 !== 1 ? pageTab1 * 50 - 50 + (ind + 1) : ind + 1}
                  </TableCell>
                  {/* <TableCell className="colorInherit" align="center">
                    {item.body.member_id}
                  </TableCell> */}
                  <TableCell className="colorInherit" align="center">
                    {item.body.member_first_name}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.member_last_name}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.member_national_id}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {item.body.date_time === "1970/01/01 00:00:00.000000" ? "" : dateMiladiToShamsi(item.body.date_time)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {findRegistrationId(item.body.registration_id)}
                  </TableCell>                  <TableCell className="colorInherit" align="center">
                    {item.body.rejection_reason === "null" ? '-' : item.body.rejection_reason}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {findStatus(item.body.status)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    <ButtonDetails
                      info={{
                        title: "مشاهده ضمائم",
                        className: "btnsGreen",
                        modal: "ModalDetails",
                      }}
                      data={item.id}
                    />
                    {
                      item.body.status === "NOT_PROCESSED" && (
                        <ButtonDetails
                          info={{
                            title: "لغو",
                            className: "btnsRed",
                            modal: "modalDelete",
                          }}
                          data={item.id}
                        />
                      )
                    }
                    {
                      item.body.status !== "NOT_PROCESSED" && (
                        <button className={'btnsGray disabledItems'}>لغو</button>
                      )
                    }
                  </TableCell>
                </TableRow>
              ))}
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
        ) : !customerReducer.loading ? (
          <CardNoData />
        ) : null}
      </TableContainer>
    </>
  );
};

export default TableUsers;
