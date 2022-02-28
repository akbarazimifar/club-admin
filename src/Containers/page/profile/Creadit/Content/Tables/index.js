import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import { dateMiladiToShamsi } from "./../../../../../Common/method/date"


const useStyles = makeStyles({
    tableContainer: {
        height: "100%",
        direction: "rtl",
        borderRadius: 10,
        maxHeight: 800,
        overflowY: 'auto',
        width: '96.2%',
        margin: 'auto',
        // marginTop:10,
    },

    table: {
        minWidth: 650,
        overflowY: 'scroll',
        direction: "ltr",
        borderRadius: 10
    },
    head: {
        fontWeight: "bold"
    },
    emptyFile: {
        textAlign: "left",
        padding: 10,
        direction: "ltr"
    },
    noCard: {
        margin: 15
    }
});


export default function SimpleTable({ flagFilter, data }) {
    const classes = useStyles();

    return (
        <TableContainer
            className={classes.tableContainer} component={Paper}
            style={{ marginTop: 30, height: flagFilter ? '55vh' : '78vh' }}>

            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHead?.map((item, ind) => (
                            <TableCell
                                key={ind}
                                className={classes.head}
                                align="center"
                            // onClick={() => handleSortTa\ble(ind, item)}
                            >
                                {item}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                {
                    data.length === 0 ?
                        <Typography className={classes.noCard} variant="h5" component="p">
                            موردی یافت نشد.
                        </Typography>
                        : (
                            <TableBody>
                                {data.map((row, ind) => (
                                    <TableRow
                                        key={ind}
                                    // className={classes.tableRow}
                                    // onClick={handleClickRow}
                                    >
                                        <TableCell className="colorInherit" align="center">{ind + 1}</TableCell>
                                        <TableCell className="colorInherit" align="center">{row.body.from_date === "1970/01/01 00:00:00.000000" ? "" :dateMiladiToShamsi(row.body.from_date)}</TableCell>
                                        <TableCell className="colorInherit" align="center">{row.body.national_id}</TableCell>
                                        <TableCell className="colorInherit" align="center">{row.body.credit}</TableCell>
                                        <TableCell className="colorInherit" align="center">{row.body.station_credit}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )
                }
            </Table>


        </TableContainer>
    );
}

const tableHead = [
    'ردیف',
    'تاریخ',
    'کد ملی',
    'مقدار اعتبار ',
    'مقدار اعتبار استیشن',
];