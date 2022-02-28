import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Buttons from "./Buttons";
import LongMenu from "./LongMenu";
import CardNoData from "./../../../../../../Common/method/cardNoData";
import { dateMiladiToShamsi } from "./../../../../../../Common/method/date";
import { seprateNumberFromComma } from "../../../../../../Common/method/seprateNumberFromComma";
import { Grid, Switch } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { ArrowDownwardIcon, ArrowUpwardIcon } from "@material-ui/data-grid";

const useStyles = makeStyles({
  tableContainer: {
    height: "100%",
    direction: "rtl",
    borderRadius: 10,
    maxHeight: 800,
    overflowY: "auto",
    width: "100%",
    margin: "auto",
    // marginTop:10,
    position: "relative",
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

const tableHead1 = [
  { id: 1, label: "نمایش", title: null, active: false },
  { id: 1, label: "ردیف", title: null, active: false },
  { id: 2, label: "نام مسابقه", title: null, active: false },
  { id: 3, label: "تاریخ شروع مسابقه", title: "start_date", active: false },
  {
    id: 4,
    label: "تاریخ پایان  مسابقه",
    title: "participation_deadline",
    active: false,
  },
  {
    id: 5,
    label: "امتیاز شرکت در مسابقه",
    title: "required_bonus",
    active: false,
  },
  {
    id: 6,
    label: "جایزه شرکت در مسابقه",
    title: "reward_bonus",
    active: false,
  },
  {
    id: 7,
    label: "ابزار",
    title: null,
    active: false,
  },

];

export default function SimpleTable({
  sort,
  setSort,
  idCompetitions,
  flagFilter,
  setflagTypePage,
  flagTypePage,
  data,
  setIdCompetitions,
  apiselectProfile,
  reducerProfile,
  apiselectProfileEmpty,
  apiParticipateInsert,
  apiParticipationsEmpty,
  apiParticipationsSelect,
  reducerParticipations,
  apiParticipateUpdate,
  apiCompetitionDeactivate,
  apiCompetitionActivate,
  handelRefresh,
  setPageTab1,
  pageTab1,
  flagPagination,
}) {
  const classes = useStyles();
  const [tablebody, setTablebody] = useState([]);

  const [tableHeadState, setTableHeadState] = useState(tableHead1);

  const tableHead = [
    "نمایش",
    "ردیف",
    "نام مسابقه",
    "تاریخ شروع مسابقه",
    "تاریخ پایان مسابقه",
    "امتیاز شرکت در مسابقه",
    "جایزه شرکت در مسابقه",
    "ابزار",
  ];

  useEffect(() => {
    setTablebody(data.data);
  }, [data.data]);

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

  return (
    <TableContainer
      className={classes.tableContainer}
      component={Paper}
      style={{ height: flagFilter ? "51.5vh" : "75vh" }}
    >
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadState?.map((item, ind) => (
              <TableCell
                key={ind}
                className={classes.head}
                align="center"
                // onClick={() => handleSortTable(ind, item)}
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
          {tablebody?.map((row, ind) => (
            <TableRow
              key={ind}
            // className={classes.tableRow}
            // onClick={handleClickRow}
            >
              <TableCell className="colorInherit" align="center">
                <LongMenu
                  handelRefresh={handelRefresh}
                  flagTypePage={flagTypePage}
                  title={"نمایش"}
                  setflagTypePage={setflagTypePage}
                  setIdCompetitions={setIdCompetitions}
                  data={row}
                  apiselectProfile={apiselectProfile}
                  reducerProfile={reducerProfile}
                  apiselectProfileEmpty={apiselectProfileEmpty}
                  apiParticipateInsert={apiParticipateInsert}
                  idCompetitions={idCompetitions}
                  apiParticipationsEmpty={apiParticipationsEmpty}
                  apiParticipationsSelect={apiParticipationsSelect}
                  reducerParticipations={reducerParticipations}
                  apiParticipateUpdate={apiParticipateUpdate}
                  apiCompetitionDeactivate={apiCompetitionDeactivate}
                  apiCompetitionActivate={apiCompetitionActivate}
                />
              </TableCell>
              <TableCell className="colorInherit" align="center">
                {
                  pageTab1 && (
                    <>
                      {
                        pageTab1 !== 1
                          ? pageTab1 * data.size - data.size + (ind + 1)
                          : ind + 1
                      }
                    </>
                  )
                }
                {
                  !pageTab1 && (
                    <>
                      {ind + 1}
                    </>
                  )
                }

              </TableCell>
              <TableCell className="colorInherit" align="center">
                {row.body.competition_title}
              </TableCell>
              <TableCell className="colorInherit" align="center">
                {" "}
                {row.body.start_date === "1970/01/01 00:00:00.000000"
                  ? ""
                  : dateMiladiToShamsi(row.body.start_date.split(" ")[0])}
              </TableCell>
              <TableCell className="colorInherit" align="center">
                {row.body.participation_deadline ===
                  "1970/01/01 00:00:00.000000"
                  ? ""
                  : dateMiladiToShamsi(
                    row.body.participation_deadline.split(" ")[0]
                  )}
              </TableCell>
              <TableCell className="colorInherit" align="center">
                {seprateNumberFromComma(row.body.required_bonus)}
              </TableCell>
              <TableCell className="colorInherit" align="center">
                {seprateNumberFromComma(row.body.reward_bonus)}{" "}
              </TableCell>
              <TableCell
                className="colorInherit"
                align="center"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Buttons
                  info={{
                    title: "ویرایش",
                    className: "btnsCompatition",
                    modal: "EditModal",
                    flagTypePage: flagTypePage,
                    data: row,
                  }}
                />
                <LongMenu
                  title={"آمار مسابقه"}
                  setflagTypePage={setflagTypePage}
                  setIdCompetitions={setIdCompetitions}
                  data={row}
                  apiselectProfile={apiselectProfile}
                  reducerProfile={reducerProfile}
                  apiselectProfileEmpty={apiselectProfileEmpty}
                  apiParticipateInsert={apiParticipateInsert}
                  idCompetitions={idCompetitions}
                  apiParticipationsEmpty={apiParticipationsEmpty}
                  apiParticipationsSelect={apiParticipationsSelect}
                  reducerParticipations={reducerParticipations}
                  apiParticipateUpdate={apiParticipateUpdate}
                  apiCompetitionDeactivate={apiCompetitionDeactivate}
                  apiCompetitionActivate={apiCompetitionActivate}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {flagPagination && (
        <>
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
        </>
      )}
    </TableContainer>
  );
}
