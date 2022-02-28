import React, { useState } from "react";
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
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import AlertDialogSlide from "../../../../Common/Components/AlertDialogSlide";


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
  { id: 2, label: "عنوان", title: "subscription_title", active: false },
  { id: 3, label: "توضیحات", title: null, active: false },
  { id: 4, label: "کدملی", title: "member_national_id", active: false },
  { id: 5, label: "نام", title: "member_first_name", active: false },
  { id: 6, label: "نام خانوادگی", title: "member_last_name", active: false },
  { id: 7, label: "تاریخ شروع", title: "start_date", active: false },
  { id: 8, label: "تاریخ پایان", title: "end_date", active: false },
  { id: 9, label: "ابزار", title: null, active: false },
];

const TableUsers = ({
  flagFilter,
  data,
  setflagApi,
  handleNull,
  pageTab1,
  setPageTab1,
  setSort,
  sort,
  handleOkAlertDeactive
}) => {
  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);
  const [alertdeactive, setalertdeactive] = useState([false, null])


  const handleChangePagination = (event, value) => {
    setPageTab1(value);
    setflagApi(prev => !prev)
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
      } else {
        setSort({ [title]: findState, id: id });
      }
    } else {
      let res = tableHeadState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHeadState(res);
      setSort({ [title]: stateSort.ASC, id: id });
    }
    setflagApi(prev => !prev)
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
                    {handleNull(row.body.subscription_title)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.subscription_description)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.member_national_id)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.member_first_name)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.member_last_name)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    {dateMiladiToShamsi(row.body.start_date)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center">
                    {dateMiladiToShamsi(row.body.end_date)}
                  </TableCell>

                  <TableCell className="colorInherit" align="center" style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className={`btnsRed ${row.body.status !== "SUBMITTED" ? "disabledItems" : ""}`}
                      onClick={() => setalertdeactive([true, row.id])}
                    >
                      غیر فعال
                    </button>
                  </TableCell>
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>

        {data.data.length !== 0 ? (
          <div className={classes.stickyPagination}>
            {
              data.total > data.size && (
                <Pagination
                  shape="rounded"
                  variant="outlined"
                  count={Math.ceil(data.total / data.size)}
                  page={pageTab1}
                  onChange={handleChangePagination}
                />
              )
            }
          </div>
        ) : (
            <CardNoData />
          )}
      </TableContainer>
      <AlertDialogSlide
        flagShow={alertdeactive[0]}

        handleCloseAlert={(flag) => setalertdeactive([flag, null])}
        handleOkAlert={() => {
          handleOkAlertDeactive(alertdeactive[1])
          setalertdeactive([false, null])
        }}
        data={datadeactive}
      />

    </>
  );
};

export default TableUsers;

const datadeactive = {
  title: "غیر فعال کردن",
  description: "آیا از غیر فعال کردن این آیتم اطمینان دارید؟",
};
