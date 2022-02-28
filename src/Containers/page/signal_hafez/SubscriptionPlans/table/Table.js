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
import AlertDialogSlide from "../../../../Common/Components/AlertDialogSlide";
import EditModal from "./editModal"


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
  { id: 2, label: "مدت زمان اشتراک", title: "duration", active: false },
  { id: 3, label: "امتیاز لازم", title: "required_bonus", active: false },
  { id: 4, label: "توضیحات", title: null, active: false },
  { id: 5, label: "عنوان", title: "title", active: false },
  { id: 6, label: "وضعیت", title: "is_active", active: false },
  { id: 7, label: "ابزار", title: null, active: false },
];

const TableUsers = ({
  flagFilter,
  data,
  handleNull,
  pageTab1,
  setPageTab1,
  setSort,
  sort,
  setflagApi,
  handleOkAlertActive,
  handleOkAlertDeactive,
  handleSubmitEdit
}) => {
  const [alertActive, setalertActive] = useState([false, null])
  const [alertdeactive, setalertdeactive] = useState([false, null])
  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);

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
                    {handleNull(row.body.duration)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.required_bonus)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.description)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {handleNull(row.body.title)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.is_active === "TRUE" ? "فعال" : "غیرفعال"}
                  </TableCell>
                  <TableCell className="colorInherit" align="center" style={{ display: "flex" }}>
                    <EditModal data={row} handleSubmitEdit={handleSubmitEdit} />
                    <button
                      className={`btnsGreen ${row.body.is_active === "TRUE" ? "disabledItems" : ""}`}
                      onClick={() => setalertActive([true, row.id])}
                    >
                      فعال
                    </button>
                    <button
                      className={`btnsRed ${row.body.is_active === "FALSE" ? "disabledItems" : ""}`}
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
              data.total > 20 && (
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
        flagShow={alertActive[0]}
        handleCloseAlert={(flag) => setalertActive([flag, alertActive[1]])}
        handleOkAlert={() => {
          handleOkAlertActive(alertActive[1])
          setalertActive([false, null])
        }}
        data={dataActive}
      />
      <AlertDialogSlide
        flagShow={alertdeactive[0]}
        handleCloseAlert={(flag) => setalertdeactive([flag, alertdeactive[1]])}
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


const dataActive = {
  title: "فعال کردن پلن",
  description: "آیا از فعال کردن این پلن اطمینان دارید؟",
};

const datadeactive = {
  title: "غیر فعال کردن پلن",
  description: "آیا از غیر فعال کردن این پلن اطمینان دارید؟",
};