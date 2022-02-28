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
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { seprateNumberFromComma } from "../../../../Common/method/seprateNumberFromComma"
import { dateMiladiToShamsi } from './../../../../Common/method/date';
import { toFixed } from '../../../../Common/method/toFixed';
import { LinearProgress } from "@material-ui/core";

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
  iconcheck: {
    width: 25,
    height: 25,
    fill: 'green',
    marginLeft: 10,
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse'
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
  sticky: {
    textAlign: "center",
    fontWeight: "bold",
    margin: "0px auto",
    position: "sticky",
    bottom: 42,
    backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr",
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  textAlign: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0px 15px'
  },
  ml: {
    marginLeft: 5,
    direction: "rtl",
    display: "inline-block",
  },
}));

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "عنوان", title: "bonus_type_name", active: false },
  { id: 4, label: "مقدار", title: "value", active: false },
  { id: 4, label: "نوع", title: "is_removed", active: false },
  { id: 3, label: "تاریخ انجام", title: "date_time", active: false },
  { id: 3, label: "تاریخ مرجع", title: "related_date", active: false },
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
}) => {

  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);
  const [total, setTotal] = useState({
    total_positive: 0,
    total_negative: 0,
    total: 0,
  })


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
        apiSort()
        return;
      }
      setSort({ [title]: findState, id: id });
      apiSort()

    } else {
      let res = tableHeadState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHeadState(res);
      setSort({ [title]: stateSort.ASC, id: id });
      apiSort()
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

  const apiSort = () => {
    setPageTab1(1);
    setflagApi(prev => !prev)
  }

  useEffect(() => {
    if (data.data.length)
      resultAlldata()
  }, [data])

  const resultAlldata = () => {

    let array = [...data.data]

    let Positive = 0
    let negative = 0

    array.forEach((item => {
      let flag = item.body.bonus_type_id.includes('REMOVE_')
      if (flag)
        negative += item.body.value
      if (!flag)
        Positive += item.body.value
    }))
    setTotal(
      {
        total_positive: Positive,
        total_negative: negative,
        total: Positive - negative,
      }
    )
  }

  return (
    <>

      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 30, height: flagFilter ? "47vh" : "80vh"  , paddingTop : !data.loading ?'4px':''}}
      >
        {
          data.loading && (
            <LinearProgress />
          )
        }
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
                    {handleNull(row.body.bonus_type_name)}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {seprateNumberFromComma(handleNull(row.body.value))}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {
                      row.body.is_removed === "TRUE"
                        ? (
                          <div className={classes['icon']}>
                            <svg className={classes['iconClose']}>
                              <use xlinkHref="/sprite.svg#close"></use>
                            </svg>
                            <p>کسر شده</p>
                          </div>
                        )
                        : (
                          <div className={classes['icon']}>
                            <svg className={classes['iconcheck']}>
                              <use xlinkHref="/sprite.svg#check"></use>
                            </svg>
                            <p>اضافه شده</p>
                          </div>
                        )

                    }
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.date_time ? dateMiladiToShamsi(row.body.date_time.split(' ')[0]) : '-'}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.related_date ? dateMiladiToShamsi(row.body.related_date.split(' ')[0]) : '-'}
                  </TableCell>
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>
        {
          data.data.length === 0 ? (
            <CardNoData value={data.loading ? 'در حال بارگذاری...' : null} />
          ) : (
              <>
                <div className={classes.sticky}>
                  <div className={classes['textAlign']}>
                    <p>مجموع:</p>
                    <p className={classes['ml']}>{toFixed(total.total)}</p>
                  </div>
                  <div className={classes['textAlign']}>
                    <p>اضافه شده:</p>
                    <p className={classes['ml']}>{toFixed(total.total_positive)}</p>
                  </div>
                  <div className={classes['textAlign']}>
                    <p>کسر شده:</p>
                    <p className={classes['ml']}>{toFixed(total.total_negative)}</p>
                  </div>
                </div>
                < p className={classes.stickyPagination}>
                  <Pagination
                    shape="rounded"
                    variant="outlined"
                    count={Math.ceil(data.total / data.size)}
                    page={pageTab1}
                    onChange={handleChangePagination}
                  />
                </p>

              </>
            )
        }

      </TableContainer>
    </>
  );
};

export default TableUsers;
