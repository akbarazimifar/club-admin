import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CardNoData from "../../../../../Common/method/cardNoData";
import { dateMiladiToShamsi } from "./../../../../../Common/method/date";
import Buttons from "./Buttons";
import { Pagination } from "@material-ui/lab";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { Checkbox } from "@material-ui/core";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { gift_v1_actions_select_registrations } from "../../../../../../boot/api/Definitions/gift/gift _v1_registrations/action";
import { GIFT_V1_SELECT_REGISTRATIONS_EMPTY, GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION_EMPTY } from "../../../../../../boot/api/typeActions";
import ModalCustom from "./../../../../../Common/Components/Modal";
import { ResultModal } from "./ResultModal";
import { handleNumber } from "../../../../../Common/method/displayData";


const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHeadStart = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نام جایزه", title: null, active: false },
  { id: 3, label: "کد ملی", title: "member_national_id", active: false },
  { id: 4, label: "نام", title: null, active: false },
  { id: 5, label: "نام خانوادگی", title: null, active: false },
  { id: 6, label: "تاریخ درخواست", title: "registration_date", active: false },
  { id: 7, label: "تاریخ بسته شدن", title: "closing_date", active: false },
  { id: 8, label: "امتیاز جایزه", title: "gift_required_bonus", active: false },
  { id: 9, label: "مانده امتیاز", title: "member_available_bonus", active: false },
  { id: 10, label: "کد کالا", title: "gift_code", active: false },
  { id: 11, label: "شماره سفارش", title: "basket_code", active: false },
  { id: 12, label: "کد رهگیری پستی", title: "postal_tracking_code", active: false },
  { id: 13, label: "وضعیت", title: "status", active: false },
  { id: 14, label: "ابزار", title: null, active: false },
];

const useStyles = makeStyles({
  tableContainer: {
    direction: "rtl",
    borderRadius: 10,
    // maxHeight: 800,
    // maxWidth:'100%',
    width: "100%",
    margin: "auto",
    // marginTop:10,
    position: "relative",
  },
  table: {
    minWidth: 650,
    direction: "ltr",
    borderRadius: 10,
    height: "100%",

  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
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
  boxEmpty: {
    width: 24,
    height: 24,
  },
  padding: {
    padding: 6
  }
});

let flag = false;
export default function SimpleTable({
  data,
  callApiRegistration,
  setStateFilterRegistration,
  apiCallFinalize,
  apiCallUnregister,
  checkPhysical,
  apiCallFinalizeSystem,
  apiCallSystemUnregister,
  classname,
  sort,
  setSort,
  paginationRegistration,
  setPaginationRegistration,
  selectMultiRow,
  setSelectMultiRow,
  handleClickPostalTrackingCode
}) {
  const classes = useStyles();
  const location = useLocation()
  const [tableHead, setTableHead] = React.useState(tableHeadStart);
  const dispatch = useDispatch()
  const reducerResultModal = useSelector(state => state.gift_v1_select_finalize_bulk_registration_Reducer)

  const handleChangeCheckboxHead = (e) => {
    if (e.target.checked) {
      let obj = {}
      data.data.map(item => {
        obj[item.id] = [true, item.body.gift_type]
      })
      setSelectMultiRow(obj)
    } else {
      setSelectMultiRow({})
    }

  }

  const handleChangeCheckboxBody = (id, giftType) => {
    if (selectMultiRow[id]) {
      let dataPrev = selectMultiRow
      delete dataPrev[id]
      setSelectMultiRow(() => ({ ...dataPrev }))
    } else {
      setSelectMultiRow(prev => ({ ...prev, [id]: [true, giftType] }))
    }
  }

  // 0 => {} ,
  // 1 => {title : "asc"} ,
  // 2 => {title : "desc"}

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
    setPaginationRegistration(value);
  };

  useEffect(() => {
    if (flag) {
      callApiRegistration(paginationRegistration);
    }

    flag = true;
  }, [sort, paginationRegistration]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location?.state?.gift_id) {
      setStateFilterRegistration(prev => ({
        ...prev, gift_id: location?.state?.gift_id
      }))

      dispatch(
        gift_v1_actions_select_registrations({ data: { gift_id: location.state.gift_id } })
      );
    } else {
      callApiRegistration()
    }
  }, [])

  useEffect(() => {
    return function cleanup() {
      setPaginationRegistration(1);
      flag = false
      setStateFilterRegistration(prev => ({
        ...prev, gift_id: ""
      }))
      dispatch({ type: GIFT_V1_SELECT_REGISTRATIONS_EMPTY })
    }
  }, [])

  const handleCloseModal = () => {
    dispatch({ type: GIFT_V1_SELECT_REGISTRATIONS_RESULT_ACTION_EMPTY })
  }

  

  return (
    <>
      <ModalCustom open={reducerResultModal.data.length !== 0} setOpen={handleCloseModal}>
        <ResultModal rows={reducerResultModal.data} />
      </ModalCustom>

      {/* <TableContainer className={classes.tableContainer} component={Paper}> */}
        <Table
          stickyHeader={true}
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.head}
                align="center"
              >
                <Checkbox
                  checked={Object.keys(selectMultiRow).length === data.data.length ? true : false}
                  onChange={handleChangeCheckboxHead}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </TableCell>
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
            {data.data.length !== 0 &&
              data.data
                .map((row, ind) => (
                  <TableRow key={ind}>
                    <TableCell className={classes.padding}>
                      <Checkbox
                        checked={selectMultiRow[row.id] ? selectMultiRow[row.id][0] : false}
                        onChange={() => handleChangeCheckboxBody(row.id, row.body.gift_type)}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {paginationRegistration !== 1
                        ? paginationRegistration * data.size -
                        data.size +
                        (ind + 1)
                        : ind + 1}
                    </TableCell>
                    <TableCell
                      className={classes.padding}
                      align="center"
                      style={{ maxWidth: 200 }}
                    >
                      {row.body.gift_name}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {row.body.member_national_id}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {row.body.member_first_name}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {row.body.member_last_name}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {row.body.registration_date === "1970/01/01 00:00:00.000000"
                        ? ""
                        : dateMiladiToShamsi(row.body.registration_date)}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {row.body.closing_date === "1970/01/01 00:00:00.000000"
                        ? ""
                        : row.body.closing_date
                          ? dateMiladiToShamsi(row.body.closing_date)
                          : "-"}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {row.body.gift_required_bonus}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {handleNumber( row.body.member_available_bonus)}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {
                        row.body.gift_type === 'PHYSICAL'
                          ? (row.body.gift_code && row.body.gift_code !== 'null')
                            ? row.body.gift_code
                            : '-'
                          : '-'
                      }
                    </TableCell>
                    <TableCell className={classes.padding} align="center" style={{direction:'initial'}}>
                      {(row.body.basket_code &&  row.body.basket_code !== 'null') ? row.body.basket_code : '-'}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {row.body.postal_tracking_code === "null" || !row.body.postal_tracking_code ? "-" : row.body.postal_tracking_code}
                    </TableCell>
                    <TableCell className={classes.padding} align="center">
                      {row.body.status === "SUBMITTED"
                        ? "در انتظار"
                        : row.body.status === "REJECTED"
                          ? "لغو شده"
                          : row.body.status === "FINALIZED"
                            ? "نهایی شده"
                            : "نامشخص"}
                    </TableCell>

                    <TableCell className={classes.padding} align="center" style={{ minWidth: 280 }}>
                      {
                        <Buttons
                          apiCallSystemUnregister={apiCallSystemUnregister}
                          apiCallFinalizeSystem={apiCallFinalizeSystem}
                          checkPhysical={checkPhysical}
                          row={row}
                          apiCallUnregister={apiCallUnregister}
                          apiCallFinalize={apiCallFinalize}
                          handleClickPostalTrackingCode={handleClickPostalTrackingCode}
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      {/* </TableContainer> */}
      {data.data.length === 0 ? (
        <CardNoData />
      ) : (
          <p className={classname[0]}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(data.total / data.size)}
              page={paginationRegistration}
              onChange={handleChangePagination}
            />
          </p>
        )}
    </>
  );
}
