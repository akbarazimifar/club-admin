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
import { Pagination } from "@material-ui/lab";
import React from "react";
import CardNoData from "./../../../../Common/method/cardNoData";
// import RefreshIcon from "@material-ui/icons/Refresh";
import ExcelListRefCode from "./excelListRefCode";

const useStyles = makeStyles((theme) => ({
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
}));
export default function Introducing({ tablebody, pageTab1, setPageTab1, introducing_member_id }) {
  const classes = useStyles();

  const handleChangePagination = (event, value) => {
    setPageTab1(value);
  };
  const handleRefresh = () => {
    setPageTab1(0);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: 'space-between', margin: '10px 0px' }}>
        <h3>لیست دعوت شده ها</h3>
        <div style={{ display: "flex", alignItems: 'center' }}>
          <ExcelListRefCode introducing_member_id={introducing_member_id} />
          {/* {tablebody.data.length !== 0 && (
            <RefreshIcon onClick={() => handleRefresh()}
              style={{ cursor: 'pointer'  , margin:'0px 10px '}}
            />
          )} */}
        </div>
      </div>

      <TableContainer component={Paper} style={{ marginTop: 5 }}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHead?.map((item, ind) => (
                <TableCell
                  key={ind}
                  align="center"
                // onClick={() => handleSortTa\ble(ind, item)}
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tablebody.data &&
              tablebody.data?.map((row, ind) => (
                <TableRow
                  key={ind}
                // onClick={handleClickRow}
                >
                  <TableCell className="colorInherit" align="center">
                    {ind + 1}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.first_name}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.last_name}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.user}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.national_id}
                  </TableCell>
                  <TableCell className="colorInherit" align="center">
                    {row.body.phone}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {tablebody.data.length !== 0 ? (
          <div className={classes.stickyPagination}>
            <Pagination
              shape="rounded"
              variant="outlined"
              count={Math.ceil(tablebody.total / tablebody.size)}
              page={pageTab1}
              onChange={handleChangePagination}
            />
          </div>
        ) : (
            <>
              <CardNoData />
            </>
          )}
      </TableContainer>
    </div>
  );
}

let tableHead = [
  "ردیف",
  "نام",
  "نام خانوادگی",
  "نام کاربری",
  "کدملی ",
  "شماره تلفن",
];
