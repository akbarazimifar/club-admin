import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CardNoData from "../../../../Common/method/cardNoData";
import { makeStyles } from "@material-ui/core/styles";
import { dateMiladiToShamsi } from '../../../../Common/method/date';
import { Pagination } from "@material-ui/lab";

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { handleNumber } from "../../../../Common/method/displayData";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "scroll",
    width: "97.2%",
    margin: "auto",

  },

  table: {
    minWidth: 650,
    maxWidth: '100%',
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
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
    '& svg': {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px"
    }
  },
  boxEmpty: {
    width: 24,
    height: 24
  }
}));

const TableUsers = ({
  flagFilter,
  data,
  handleNull,
  pageTab1,
  setPageTab1,
  sort,
  setSort,
  loading,
  handelReturned_from_bank,
  handelIs_verified,
  handelTerminal_id,
  setflagApi,
}) => {

  const classes = useStyles();


  const handleChangePagination = (event, value) => {
    setPageTab1(value);
    setflagApi(prev => !prev)
  };


  const tableHeadStart = [
    { id: 1, label: "ردیف", title: null, active: false },
    { id: 3, label: "نام", title: "member_first_name", active: false },
    { id: 4, label: "نام خانوادگی", title: "member_last_name", active: false },
    { id: 5, label: "کد ملی", title: "member_national_id", active: false },
    { id: 2, label: "شماره پایانه", title: "terminal_id", active: false },
    { id: 6, label: "کد تفضیلی", title: "member_account_code", active: false },
    { id: 7, label: "شناسه اتوماسیون", title: "member_automation_id", active: false },
    { id: 8, label: "شناسه تراکنش", title: "payment_id", active: false },
    { id: 9, label: "بازگشت از بانک", title: "returned_from_bank", active: false },
    { id: 10, label: "نتیجه بازگشتی", title: "returned_result", active: false },
    { id: 11, label: "توضیحات", title: "returned_description", active: false },
    { id: 12, label: "مبلغ", title: "amount", active: false },
    { id: 13, label: "تاریخ تایید تراکنش", title: "verification_date", active: false },
    { id: 14, label: "تاریخ درخواست", title: "request_date", active: false },
    { id: 15, label: "تایید تراکنش", title: "is_verified", active: false },
    { id: 16, label: "وضعیت", title: "club_state", active: false },
  ];

  const [tableHead, setTableHead] = React.useState(tableHeadStart)


  const stateSort = {
    DEFAULT: "DEFAULT",
    ASC: "asc",
    DESC: "desc"
  }

  const findStateSort = (title) => {
    switch (sort[title]) {
      case stateSort.DEFAULT:
        return stateSort.ASC
      case stateSort.ASC:
        return stateSort.DESC
      case stateSort.DESC:
        return stateSort.DEFAULT
      default:
        return stateSort.DEFAULT
    }
  }

  const handleClickSort = (title, id) => {
    if (!title) {
      alert("امکان فیلتر این ستون وجود ندارد.")
      return
    }

    if (id === sort.id) {
      let findState = findStateSort(title)
      if (findState === stateSort.DEFAULT) {
        setSort({})
        setflagApi(prev => !prev)
        return
      }
      setSort({ [title]: findState, id: id })
      setflagApi(prev => !prev)
    } else {
      let res = tableHead.map(item => item.id === id ? { ...item, active: true } : { ...item, active: false })
      setTableHead(res)
      setSort({ [title]: stateSort.ASC, id: id })
      setflagApi(prev => !prev)
    }
  }



  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ marginTop: 30, height: flagFilter ? "36vh" : "80vh" }}
      >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, index) => (
                <TableCell
                  key={index}
                  className={classes.head}
                  align="center"
                  onClick={() => handleClickSort(item.title, item.id)}
                >
                  {item.label}
                  {
                    item.active ? (
                      sort[item.title] === stateSort.ASC ?
                        <ArrowUpwardIcon />
                        : sort[item.title] === stateSort.DESC ?
                          <ArrowDownwardIcon />
                          :
                          <svg className={classes.boxEmpty}></svg>
                    ) :
                      <svg className={classes.boxEmpty}></svg>
                  }
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
                      {pageTab1 !== 1 ? (pageTab1 * data.size) - data.size + (ind + 1) : ind + 1}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.member_first_name)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.member_last_name)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.member_national_id)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handelTerminal_id(row.body.terminal_id)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.member_account_code)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.member_automation_id)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.payment_id)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handelReturned_from_bank(row.body.returned_from_bank)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.returned_result)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.returned_description)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNumber(row.body.amount)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull((row.body.verification_date && row.body.verification_date !== 'null') ? dateMiladiToShamsi(row.body.verification_date.split(' ')[0]) : '')}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull((row.body.request_date && row.body.request_date !== 'null') ? dateMiladiToShamsi(row.body.request_date.split(' ')[0]) : '')}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handelIs_verified(row.body.is_verified)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.club_state)}
                    </TableCell>

                  </TableRow>
                )
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
            <CardNoData value={loading ? 'در حال بارگذاری ...' : null} />
          )}
      </TableContainer>
    </>
  );
};

export default TableUsers;
