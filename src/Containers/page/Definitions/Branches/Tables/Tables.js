import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import RoomIcon from "@material-ui/icons/Room";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Checkbox from "@material-ui/core/Checkbox";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import RadioButtonsGroup from "./RadioButtonsGroup";

import ModalAEdit from "../Tables/ModalAEdit";
import AlertDialogSlide from "./../../../../Common/Components/AlertDialogSlide";
import { Pagination } from "@material-ui/lab";
import CardNoData from "../../../../Common/method/cardNoData";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";

const useStyles = makeStyles({
  tableContainer: {
    direction: "rtl",
    borderRadius: 10,
    overflowY: "scroll",
    width: "96.2%",
    margin: "auto",
    marginTop: 30,
  },

  table: {
    maxHeight: "100px",
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
  icons: {
    width: "96.2%",
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
  boxEmpty: {
    width: 24,
    height: 24,
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
});
let flag = false;
const stateSort = {
  DEFAULT: "DEFAULT",
  ASC: "asc",
  DESC: "desc",
};
const tableHead = [
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "شعبه", title: "Name", active: false },
  { id: 3, label: "استان", title: "ProvinceName", active: false },
  { id: 4, label: "شهر", title: "CityName", active: false },
  { id: 5, label: "مسئول", title: "DirectorName", active: false },
  { id: 6, label: "آدرس", title: null, active: false },
  { id: 6, label: "کد معرف شعبه", title: "recommender_id", active: false },
  { id: 7, label: "تلفن", title: "PhoneNumber", active: false },
  { id: 8, label: "کد", title: null, active: false },
  { id: 9, label: "فعال/غیرفعال", title: null, active: false },
  { id: 10, label: "شعبه/نمایندگی", title: null, active: false },
  { id: 11, label: "شعبه مرکزی", title: null, active: false },
  { id: 12, label: "کد پستی", title: "PostalCode", active: false },
  { id: 13, label: "نقشه", title: null, active: false },
  // "ردیف",
  // "شعبه ",
  // "استان",
  // "شهر",
  // "مسئول",
  // "آدرس",
  // "تلفن",
  // "کد",
  // "فعال/غیرفعال",
  // "شعبه/نمایندگی",
  // "شعبه مرکزی",
  // "کد پستی",
  // "نقشه",
];

export default function SimpleTable({
  flagFilter,
  barnches_reducer,
  handelsubmitUpdate,
  handelSubmitDelete,
  pageTab1,
  setPageTab1,
  api_call_select,
  setSort,
  sort,
}) {
  const classes = useStyles();

  const [data, setDate] = useState([]);
  const [activeItems, SetIActiveItems] = useState({ id: "", index: "" });
  const [flagEdit, setFlagEdit] = useState(false);
  const [ensureDelete, setEnsureDelete] = useState(false);

  const [tableHeadState, setTableHeadState] = useState(tableHead);

  useEffect(() => {
    if (barnches_reducer.data) {
      let res = barnches_reducer.data;
      setDate(res);
    }
  }, [barnches_reducer]);

  const handelCheckActiveItems = () => {
    if (activeItems.id) {
      setFlagEdit(true);
    } else alert("لطفا شعبه مورد نظر خود را انتخاب کنید");
  };

  const handleClickDeleteItems = () => {
    if (activeItems) {
      setEnsureDelete(true);
    } else alert("لطفا شعبه مورد نظر خود را انتخاب کنید");
  };

  const handelDelete = () => {
    setEnsureDelete(false);
    handelSubmitDelete(activeItems);
  };

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
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
      let res = tableHeadState.map((item) =>
        item.id === id ? { ...item, active: true } : { ...item, active: false }
      );
      setTableHeadState(res);
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
    if (flag) {
      api_call_select();
    }
    flag = true;
  }, [pageTab1]);

  return (
    <div>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        style={{ height: flagFilter ? "55.5vh" : "78vh" }}
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
            {data &&
              data
                // .filter((item,ind)=> ind === 89  )
                .map((row, ind) => (
                  <TableRow
                    selected={activeItems.id === row.id ? true : false}
                    key={ind}
                    onClick={() => SetIActiveItems({ id: row.id, index: ind })}
                    // className={classes.tableRow}
                    // onClick={handleClickRow}
                  >
                    <TableCell className="colorInherit" align="left">
                      <div>
                        {" "}
                        {pageTab1 !== 1
                          ? pageTab1 * barnches_reducer.size -
                            barnches_reducer.size +
                            (ind + 1)
                          : ind + 1}
                      </div>
                    </TableCell>
                    <TableCell className="colorInherit" align="left">
                      <div>{row.body.Name}</div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      <div>{row.body.ProvinceName}</div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      <div>{row.body.CityName}</div>
                    </TableCell>
                    <TableCell className="colorInherit" align="left">
                      <div>{row.body.DirectorName}</div>
                    </TableCell>
                    {/* <TableCell className="colorInherit" align="center"><div>{row.body.Name}</div></TableCell> */}
                    {/* <TableCell className="colorInherit" align="center"><div>{row.body.DirectorName}</div></TableCell> */}
                    <TableCell className="colorInherit" align="left">
                      <div>{row.body.Address}</div>
                    </TableCell>
                    <TableCell className="colorInherit" align="left">
                      <div>{row.body.recommender_id}</div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      <div>{row.body.PhoneNumber}</div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      {" "}
                      <div>{row.body.CityCodePhoneNumber}</div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      <div>
                        <Checkbox
                          checked={JSON.parse(row.body.IsActive.toLowerCase())}
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      <div>
                        <RadioButtonsGroup
                          flag={row.body.IsBranch}
                          activeChange={false}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      <div>
                        <Checkbox
                          checked={JSON.parse(
                            row.body.IsMainBranch.toLowerCase()
                          )}
                          color="primary"
                          inputProps={{ "aria-label": "secondary checkbox" }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      <div>{row.body.PostalCode}</div>
                    </TableCell>
                    <TableCell className="colorInherit" align="center">
                      <div>
                        <a href={row.body.GoogleMapUrl}>
                          <RoomIcon fontSize={"large"} />
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>

        {data ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(barnches_reducer.total / barnches_reducer.size)}
              page={pageTab1}
              onChange={handleChangePagination}
            />
          </div>
        ) : (
          <CardNoData />
        )}
      </TableContainer>

      <div className={classes["icons"]}>
        <div style={{ paddingRight: 15 }}>
          <span>
            <CreateIcon onClick={() => handelCheckActiveItems()} />
          </span>
          <span>
            <DeleteForeverIcon onClick={() => handleClickDeleteItems()} />
          </span>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description11"
        className={classes.modal}
        open={flagEdit}
        onClose={() => setFlagEdit(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={flagEdit}>
          <ModalAEdit
            handleCloseModal={() => setFlagEdit(false)}
            data={data[activeItems.index]}
            handelsubmitUpdate={handelsubmitUpdate}
            activeItems={activeItems}
          />
        </Fade>
      </Modal>

      <AlertDialogSlide
        flagShow={ensureDelete}
        handleCloseAlert={setEnsureDelete}
        handleOkAlert={() => handelDelete()}
        data={dataAlertDialogSlide}
      />
    </div>
  );
}

const dataAlertDialogSlide = {
  title: "حذف",
  description: "از حذف این رکورد اطمینان دارید؟",
};
