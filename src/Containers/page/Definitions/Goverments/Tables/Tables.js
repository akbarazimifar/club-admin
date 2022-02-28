import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
// import CreateIcon from '@material-ui/icons/Create';
import TableBodyCustom from "./TableBody";
import AlertDialogSlide from "./../../../../Common/Components/AlertDialogSlide";
import { pishkhan_v1_actions_delete } from "./../../../../../boot/api/Definitions/pishkhan/pishkhan_v1_delete/action";
import { useDispatch } from "react-redux";
import { Pagination } from "@material-ui/lab";
import CardNoData from "../../../../Common/method/cardNoData";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";

const useStyles = makeStyles({
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

  table: {
    minWidth: 650,
    overflowY: "scroll",
    direction: "ltr",
    borderRadius: 10,
  },
  head: {
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace:'nowrap',
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
  icons: {
    width: "96.5%",
    margin: "auto",
    border: "1px solid rgba(0,0,0,0.1)",
    backgroundColor: "white",
    padding: "5px 5px",
    position: "relative",
    top: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    "& span": {
      padding: "0 5px",
      cursor: "pointer",
    },
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
  boxEmpty: {
    width: 24,
    height: 24,
  },
});

const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};

const tableHeadStart = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "استان", title: "ProvinceName", active: false },
  { id: 3, label: "مسئول دفتر", title: "FullName", active: false },
  { id: 4, label: "کد دفتر", title: "OfficeId", active: false },
  { id: 5, label: "تلفن یا فکس", title: "PhoneNumber", active: false },
  { id: 6, label: "کد پستی", title: "PostalCode", active: false },
  { id: 7, label: "آدرس", title: "Address", active: false },
];

let flag = false;

export default function SimpleTable({
  data,
  flagFilter,
  setPagination,
  pagination,
  apiCallSelect,
  dataReducer,
  sort,
  setSort,
}) {
  const [selectedItem, setSelectedItem] = useState([false, null]);
  const [ensureDelete, setEnsureDelete] = useState(false);
  const [tableHead, setTableHead] = useState(tableHeadStart);
  const dispatch = useDispatch();

  const classes = useStyles();

  //   const tableHead = [
  //     "ردیف",
  //     "استان",
  //     "مسئول دفتر",
  //     "کد دفتر",
  //     "تلفن یا فکس",
  //     "کد پستی",
  //     "آدرس",
  //   ];

  const handleDeleteFaq = () => {
    if (!selectedItem[0]) {
      alert("گزینه ای انتخاب نکرده اید");
      return;
    }

    setEnsureDelete(true);
  };

  const handleOkAlert = () => {
    dispatch(pishkhan_v1_actions_delete(selectedItem[1]));
    setEnsureDelete(false);
  };

  const handleChangePagination = (event, value) => {
    setPagination(value);
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



  useEffect(() => {
    if (flag) apiCallSelect();

    flag = true;
  }, [pagination]);

  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ height: flagFilter ? "54vh" : "77vh" }}
      >
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, ind) => (
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
            {data.map((row, ind) => (
              <TableBodyCustom
                data={row}
                selectedItem={selectedItem}
                changedSelected={setSelectedItem}
                key={ind}
                index={ind}
              />
            ))}
          </TableBody>
        </Table>
        {dataReducer.data.length !== 0 ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(dataReducer.total / dataReducer.size)}
              page={pagination}
              onChange={handleChangePagination}
            />
          </div>
        ) : (
          <CardNoData />
        )}
      </TableContainer>
      <div className={classes["icons"]}>
        <div style={{ paddingRight: 15 }}>
          {/* <span>
                        <CreateIcon 
                        onClick={() => handleEditFaq()} 
                        />
                    </span> */}
          <span>
            <DeleteForeverIcon onClick={handleDeleteFaq} />
          </span>
        </div>
      </div>
      {/* ---------ensure delete------ */}
      <AlertDialogSlide
        flagShow={ensureDelete}
        handleCloseAlert={setEnsureDelete}
        handleOkAlert={handleOkAlert}
        data={dataAlertDialogSlide}
      />
    </>
  );
}

const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟",
};
