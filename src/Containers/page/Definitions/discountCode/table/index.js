import React, { useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardNoData from "../../../../Common/method/cardNoData";
import { makeStyles } from "@material-ui/core/styles";
import ButtonDetails from "../ButtonDetails";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import { Pagination } from "@material-ui/lab";
import ButtonEdit from "../buttonEdit/index";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

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
    direction: "ltr",
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
    height: 24,
  },
}));

const TableUsers = ({
  flagFilter,
  data,
  handleNull,
  pageTab1,
  setPageTab1,
  sort,
  setSort,
  apiSelectdiscountCode,
}) => {
  const classes = useStyles();

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };

  const tableHeadStart = [
    { id: 1, label: "ردیف", title: null, active: false },
    { id: 2, label: "کد تخفیف", title: "code", active: false },
    { id: 3, label: "نام", title: "issuer_first_name", active: false },
    { id: 4, label: "نام خانوادگی", title: "issuer_last_name", active: false },
    { id: 5, label: "کد ملی", title: "issuer_national_id", active: false },
    { id: 6, label: "دسته بندی", title: "gift_title", active: false },
    { id: 7, label: "تاریخ انقضا", title: "expiration_date", active: false },
    { id: 8, label: "تاریخ دریافت", title: "registration_date", active: false },
    // { id: 5, label: "کاربر ادمین", title: null, active: false },
    { id: 9, label: "عملیات", title: null, active: false },
  ];

  const [tableHead, setTableHead] = React.useState(tableHeadStart);

  const stateSort = {
    DEFAULT: "DEFAULT",
    ASC: "asc",
    DESC: "desc",
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
      let res = tableHead.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHead(res);
      setSort({ [title]: stateSort.ASC, id: id });
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
              {/* {tableHead?.map((item, ind) => (
                <TableCell key={ind} className={classes.head} align="center">
                  {item}
                </TableCell>
              ))} */}
              {tableHead?.map((item, index) => (
                <TableCell
                  key={index}
                  className={classes.head}
                  align="center"
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
              ? data.data.map((row, ind) => {
                  return (
                    <TableRow key={ind}>
                      <TableCell className="colorInherit" align="center">
                        {pageTab1 !== 1
                          ? pageTab1 * data.size - data.size + (ind + 1)
                          : ind + 1}
                      </TableCell>
                      <TableCell className="colorInherit" align="center">
                        {handleNull(row.body.code)}
                      </TableCell>
                      <TableCell className="colorInherit" align="center">
                        {handleNull(row.body.issuer_first_name)}
                      </TableCell>
                      <TableCell className="colorInherit" align="center">
                        {handleNull(row.body.issuer_last_name)}
                      </TableCell>
                      <TableCell className="colorInherit" align="center">
                        {handleNull(row.body.issuer_national_id)}
                      </TableCell>
                      <TableCell className="colorInherit" align="center">
                        {handleNull(row.body.gift_title)}
                      </TableCell>

                      <TableCell className="colorInherit" align="center">
                        {handleNull(
                          dateMiladiToShamsi(
                            row.body.expiration_date.split(" ")[0]
                          )
                        )}
                      </TableCell>
                      <TableCell className="colorInherit" align="center">
                        {handleNull(
                          dateMiladiToShamsi(
                            row.body.registration_date?.split(" ")[0]
                          )
                        )}
                      </TableCell>

                      <TableCell className="colorInherit" align="center">
                        <ButtonEdit
                          data={row}
                          apiSelectdiscountCode={apiSelectdiscountCode}
                        />
                        <ButtonDetails
                          info={{
                            title: "حذف",
                            className: "btnsRed",
                            modal: "ModalDetails",
                          }}
                          data={row}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
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
