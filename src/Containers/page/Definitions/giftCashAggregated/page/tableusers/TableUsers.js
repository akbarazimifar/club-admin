import React, { useState, useEffect } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardNoData from "../../../../../Common/method/cardNoData";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
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
  }
}));

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نام", title: "member_first_name", active: false },
  { id: 2, label: " نام خانوادگی", title: "member_last_name", active: false },
  { id: 4, label: "کد ملی", title: "member_national_id", active: false },
  { id: 4, label: "کد تفصیلی", title: "member_account_code", active: false },
  { id: 3, label: "مجموع امتیاز", title: "sum_bonus", active: false },
  { id: 3, label: "مجموع مبلغ", title: "sum_amount", active: false },
];

const TableUsers = ({
  flagFilter,
  data,
  handleNull,
  pageTab1,
  setPageTab1,
  setSort,
  sort,
}) => {

  const classes = useStyles();
  const [tableHeadState, setTableHeadState] = useState(tableHead);

  const [total, setTotal] = useState({
    total_positive: 0,
    // total_negative: 0,
    total: 0,
  })

  useEffect(() => {
    if (data.data.length)
      resultAlldata()
  }, [data,pageTab1])


  const resultAlldata = () => {

    let array = [...data.data]

    let Positive = 0
 

    array
    .filter((row, index) => {
      if (
        index + 1 >= ((pageTab1 * data.size) - data.size) + 1 &&
        index + 1 <= (pageTab1 * data.size)
      )
        return row
      return null
    })
    .forEach((item => {


      let flag = item.body["sum_bonus"] 

      if (flag)
        Positive += item.body['sum_bonus']

    }))
    setTotal(
      {
        // total_positive: Positive,
        // total_negative: negative,
        total: Positive ,
      }
    )
  }

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };

  return (
    <>
      {
        data.loading && (
          <div className={classes['LinearProgress']}>
            <LinearProgress />
          </div>
        )
      }
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
                // onClick={() => handleClickSort(item.title, item.id)}
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
              ? data.data
                .filter((row, index) => {
                  if (
                    index + 1 >= ((pageTab1 * data.size) - data.size) + 1 &&
                    index + 1 <= (pageTab1 * data.size)
                  )
                    return row
                  return null
                })
                .map((row, ind) => (
                  <TableRow key={ind}>
                    <TableCell className="colorInherit" align="center">
                      {pageTab1 !== 1
                        ? pageTab1 * data.size - data.size + (ind + 1)
                        : ind + 1}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body["member_first_name"])}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body["member_last_name"])}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body['member_national_id'])}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body['member_account_code'])}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body['sum_bonus'])}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body['sum_amount'])}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>

        {data.data.length !== 0 ? (
          <>
            <div className={classes.sticky}>
              <div className={classes['textAlign']}>
                <p>مجموع کل امتیازات:</p>
                <p className={classes['ml']}>{total.total}</p>
              </div>
              {/* <div className={classes['textAlign']}>
                <p>تایید شده:</p>
                <p className={classes['ml']}>{total.total_positive}</p>
              </div>
              <div className={classes['textAlign']}>
                <p>در انتظار:</p>
                <p className={classes['ml']}>{total.total_negative}</p>
              </div> */}
            </div>

            <div className={classes.stickyPagination}>
              <Pagination
                shape="rounded"
                variant="outlined"
                count={Math.ceil(data.total / data.size)}
                page={pageTab1}
                onChange={handleChangePagination}
              />
            </div>
          </>
        ) : (
            <CardNoData />
          )}
      </TableContainer>
    </>
  );
};

export default TableUsers;
