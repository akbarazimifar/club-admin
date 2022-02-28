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
  setflagApi,
}) => {

  const classes = useStyles();


  const handleChangePagination = (event, value) => {
    setPageTab1(value);
    setflagApi(prev => !prev)
  };


  const tableHeadStart = [
    { id: 1, label: "ردیف", title: null, active: false },
    { id: 3, label: "تاریخ", title: "date_time", active: false },
    { id: 3, label: "تاریخ مرجع", title: "related_date_time", active: false },
    { id: 3, label: "کارمزد(ریالی)", title: "total_commission", active: false },
    { id: 3, label: "کارمزد(ریالی) مرجع", title: "related_total_commission", active: false },
    { id: 3, label: "جمع امتیازات", title: "bonus_value", active: false },
    { id: 3, label: "جمع امتیازات مرجع", title: "related_bonus_value", active: false },
    { id: 3, label: "معادل ریالی امتیازات", title: "rial_equivalent", active: false },
    { id: 3, label: "معادل ریالی امتیازات مرجع", title: "related_rial_equivalent", active: false },
    { id: 3, label: "نسبت", title: "ratio", active: false },
    { id: 3, label: "نسبت مرجع", title: "related_ratio", active: false },
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
        style={{ marginTop: 30, height: flagFilter ? "45vh" : "80vh" }}
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
                      {handleNull((row.body.date_time && row.body.date_time !== 'null') ? dateMiladiToShamsi(row.body.date_time.split(' ')[0]) : '')}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull((row.body.related_date_time && row.body.related_date_time !== 'null') ? dateMiladiToShamsi(row.body.related_date_time.split(' ')[0]) : '')}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.total_commission)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.related_total_commission)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNumber(row.body.bonus_value)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNumber(row.body.related_bonus_value)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNumber(row.body.rial_equivalent)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNumber(row.body.related_rial_equivalent)}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.ratio ? row.body.ratio.toFixed(4) : '')}
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {handleNull(row.body.related_ratio ? row.body.related_ratio.toFixed(4) : '')}
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
