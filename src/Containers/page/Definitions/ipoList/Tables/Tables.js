import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { dateMiladiToShamsi } from "../../../../Common/method/date";
import { useSelector } from "react-redux";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Pagination } from "@material-ui/lab";
import { sepratePriceFromComma } from "../../../../Common/method/seprateNumberFromComma";


const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: 650,
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 700,
    overflowY: "auto",
    // overflowX: 'hidden',
    width: "96.2%",
    margin: "auto",
    position: "relative",
    // paddingBottom:'100px'
    // marginTop:10,
  },

  table: {
    minWidth: 650,
    // overflowY: 'scroll',
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
    padding: " 16px 5px",
    "& svg": {
      verticalAlign: "middle",
      fill: "rgba(1,1,1,0.5)",
      margin: " 0 1px",
    },
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
  loadBtn: {
    textAlign: "center",
    // paddingBottom:'100px'
    padding: "10px",
  },
  pagination: {
    textAlign: "center",
    fontWeight: "bold",
    position: "sticky",
    bottom: 0,
    width: "100%",
    margin: "auto",
    /* left: 0; */
    backgroundColor: "whitesmoke",
    padding: "5px 0",
    display: "flex",
    justifyContent: "center",
    direction: "ltr",
  },
  emptyFile: {
    textAlign: "left",
    padding: 10,
    direction: "ltr",
  },
  boxEmpty: {
    width: 24,
    height: 24,
  },
}));

// const tableHead = [
//     'ردیف',
//     'نام سهم',
//     'نام',
//     'نام خانوادگی',
//     'کدملی',
//     'کد معاملاتی',
//     'تاریخ و ساعت درخواست',
//     'تاریخ و ساعت انصراف',
//     'قیمت درخواست شده',
//     'حجم درخواست شده',
//     'وضعیت پیش نیازها',
// ]

const tableHeadStart = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نام سهم", title: null, active: false },
  { id: 3, label: "نام", title: null, active: false },
  { id: 4, label: "نام خانوادگی", title: null, active: false },
  { id: 5, label: "کدملی", title: null, active: false },
  {
    id: 6,
    label: "کد معاملاتی",
    title: null,
    active: false,
  },
  {
    id: 7,
    label: "تاریخ و ساعت درخواست",
    title: "registration_date",
    active: false,
  },
  { id: 8, label: "تاریخ و ساعت انصراف", title: "ipo_end_date", active: false },
  { id: 9, label: "قیمت درخواست شده", title: "requested_price", active: false },
  {
    id: 10,
    label: "حجم درخواست شده",
    title: "requested_quantity",
    active: false,
  },
  { id: 11, label: "وضعیت پیش نیازها", title: "state", active: false },
];

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

export default function SimpleTable({
  handelSubmitDelete,
  flagFilter,
  data,
  val,
  setState,
  valueIpo,
  setmore,
  apiCall,
  setPagination,
  pagination,
  sort,
  setSort,
  Reducer,
}) {
  const classes = useStyles();
  // const dispatch = useDispatch()
  const from = useSelector((state) => state.select_ipo_list_reducer);
  const [tableHead, setTableHead] = React.useState(tableHeadStart);

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

  const handleChangePagination = (event, value) => {
    setPagination(value);
  };

  const hanldepro = (val) => {
    if (val === "NOT_PROCESSED") {
      return "در دست بررسی";
    }
    if (val === "FINALIZED") {
      return "تایید شده";
    }
    if (val === "REJECTED") {
      return "رد شده";
    }
  };

  const handleLoadBtn = () => {
    apiCall(valueIpo.id, from.from + 20);
  };

  // const handleLoadBtn = ()=>{
  //     apiCall2(valueIpo.id,from.from + 20)
  // }
  // const apiCall2 = (id , from) => {
  //     dispatch(ipoList_select_action(id , from));
  // };

  useEffect(() => {
    if (from.data) setState(from.data);
  }, [from.data]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        // style={{ marginTop: 30, height: flagFilter ? '61vh' : '80vh' }}
      >
        <Table
          stickyHeader={true}
          className={classes.table}
          aria-label="simple table"
        >
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
            {data?.map((row, ind) => (
              <TableRow
                key={ind}
                // className={classes.tableRow}
                // onClick={handleClickRow}
              >
                <TableCell className="colorInherit" align="center">
                  {pagination !== 1
                    ? pagination * Reducer.size - Reducer.size + (ind + 1)
                    : ind + 1}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row?.body.ipo_stock_name}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {" "}
                  {row?.body.member_first_name}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row?.body.member_last_name}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row?.body.member_national_id}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row?.body.member_bourse_account}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {dateMiladiToShamsi(
                    row?.body.registration_date.split(" ")[0]
                  )}{" "}
                  {row?.body.registration_date.split(" ")[1].split(".")[0]}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {dateMiladiToShamsi(row?.body.ipo_end_date.split(" ")[0])}{" "}
                  {row?.body.ipo_end_date.split(" ")[1].split(".")[0]}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {sepratePriceFromComma(row?.body.requested_price)}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {row?.body.requested_quantity}
                </TableCell>
                <TableCell className="colorInherit" align="center">
                  {hanldepro(row?.body.state)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <div className={classes.loadBtn}> */}

        {/* <Button color="primary" onClick={() => handleLoadBtn()} style={{ cursor: "pointer", color: "#198cf0", fontWeight: "bold" }}>بارگذاری موارد بیشتر...</Button> */}
        {/* </div> */}
      <div className={classes.pagination}>
        <Pagination
          shape="rounded"
          variant="outlined"
          count={Math.ceil(from.total / from.size)}
          page={pagination}
          onChange={handleChangePagination}
        />
      </div>
      </TableContainer>
    </>
  );
}
