import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";
import { Pagination } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardNoData from '../../../../Common/method/cardNoData'
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import { handleNumber, handleNull } from "../../../../Common/method/displayData";
import ButtonDetails from "../buttonDetails/ButtonDetails";


const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto",
    marginTop: 30,
  },
  tableContainer: {
    height: "100%",
    direction: "ltr",
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
    width: '150%',
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

const tableHeadStart = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نام", title: "member_first_name", active: false },
  { id: 2, label: "نام خانوادگی", title: "member_last_name", active: false },
  { id: 3, label: "کد ملی", title: "member_national_id", active: false },
  { id: 3, label: "نماد", title: "stock_symbol", active: false },
  { id: 4, label: "شرکت", title: "company_name", active: false },
  { id: 5, label: "تاریخ مجمع", title: "agm_date", active: false },
  { id: 6, label: "تعداد سهام", title: "stocks", active: false },
  { id: 7, label: "ارزش سود", title: "dividend_value", active: false },
  { id: 8, label: "سود ناخالص نقدی توزیع شده", title: "distributed_gross_margin", active: false },
  { id: 9, label: "سود خالص نقدی توزیع شده", title: "distributed_netincome", active: false },
  { id: 10, label: "تاریخ اعلام", title: "publish_date", active: false },
  { id: 11, label: "تاریخ پرداخت", title: "pay_date", active: false },
  { id: 12, label: "ارزش سهام پیش از مجمع ", title: "pre_price_stock_agm", active: false },
  { id: 13, label: "قیمت سهم پس از مجمع", title: "post_price_stock_agm", active: false },
  { id: 14, label: "قیمت سهم پیش از مجمع", title: "pre_value_stock", active: false },
  { id: 15, label: "ارزش سهام پس از مجمع", title: "post_value_stock", active: false },
  { id: 16, label: "سرمایه شرکت", title: "company_asset", active: false },
  { id: 17, label: "سود خالص تحقق یافته", title: "valid_netincome", active: false },
  { id: 18, label: "ابزار", title: null, active: false },
];


const Index = ({ stocCashSelect, flagFilter, pageTab1, setpageTab1, sort, setSort, setflagApi }) => {

  const classes = useStyles();
  const [stateData, setstateData] = useState([]);




  const handleChangePagination = (event, value) => {
    setpageTab1(value);
    setflagApi(prev => !prev)
  };


  useEffect(() => {
    setstateData(stocCashSelect)
  }, [stocCashSelect]);

  const [tableHead, setTableHead] = React.useState(tableHeadStart);


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
        style={{ marginTop: 30, height: flagFilter ? "30vh" : "80vh" }}
      >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, index) => (
                <TableCell
                  key={index}
                  className={classes.head}
                  align="center"
                  style={{ minWidth: 100 }}
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
            {stateData?.data?.map((row, index) => (
              <TableRow>
                <TableCell className="colorInherit" align="center">
                  {pageTab1 !== 1
                    ? pageTab1 * stocCashSelect.size -
                    stocCashSelect.size +
                    (index + 1)
                    : index + 1}
                </TableCell>
                <TableCell className="colorInherit" align="center">{handleNull(row.body.member_first_name)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNull(row.body.member_last_name)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNull(row.body.member_national_id)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNull(row.body.stock_symbol)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNull(row.body.company_name)}</TableCell>
                <TableCell className="colorInherit" align="center">
                  {
                    row.body.agm_date
                      ? dateMiladiToShamsi(row.body.agm_date.split(' ')[0])
                      : ''
                  }
                </TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.stocks)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.dividend_value)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.distributed_gross_margin)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.distributed_netincome)}</TableCell>
                <TableCell className="colorInherit" align="center">
                  {
                    row.body.publish_date
                      ? dateMiladiToShamsi(row.body.publish_date.split(' ')[0])
                      : ''
                  }
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {
                    row.body.pay_date
                      ? dateMiladiToShamsi(row.body.pay_date.split(' ')[0])
                      : ''
                  }
                </TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.pre_price_stock_agm)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.post_price_stock_agm)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.pre_value_stock)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.post_value_stock)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.company_asset)}</TableCell>
                <TableCell className="colorInherit" align="center">{handleNumber(+row.body.valid_netincome)}</TableCell>
                <TableCell className="colorInherit" align="center">

                  <ButtonDetails
                    info={{
                      title: "حذف",
                      className: "btnsRed",
                      modal: "modalDelete",
                    }}
                    data={row}
                    setflagApi={setflagApi}
                  />
                  <ButtonDetails
                    info={{
                      title: "ویرایش",
                      className: "btnsBlue",
                      modal: "ModalEdit",
                    }}
                    data={row}
                    setflagApi={setflagApi}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {stateData?.data?.length !== 0 ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(stateData.total / stateData.size)}
              page={pageTab1}
              onChange={handleChangePagination}
            />
          </div>
        ) : (
            <CardNoData value={stocCashSelect.loading ? 'در حال بارگذاری...' : null} />
          )}
      </TableContainer>
    </>
  );
};

export default Index;
