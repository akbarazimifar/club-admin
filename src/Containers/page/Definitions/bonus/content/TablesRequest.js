import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CardNoData from "../../../../Common/method/cardNoData";
import { dateMiladiToShamsi } from "./../../../../Common/method/date";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Pagination } from '@material-ui/lab';
import { seprateNumberFromComma } from '../../../../Common/method/seprateNumberFromComma';

const useStyles = makeStyles({
    tableContainer: {
        height: "100%",
        direction: "rtl",
        borderRadius: 10,
        maxHeight: 716,
        width: '100%',
        margin: 'auto',
        overflow: 'auto',
        position: "relative"
    },
    table: {
        minWidth: 650,
        direction: "ltr",
        borderRadius: 10
    },
    head: {
        fontWeight: "bold",
        cursor: "pointer",
        whiteSpace: "nowrap",
        padding: "10px 5px",
        '& svg': {
            verticalAlign: "middle",
            fill: "rgba(1,1,1,0.5)",
            margin: " 0 1px"
        }
    },
    boxEmpty: {
        width: 24,
        height: 24
    },
    emptyFile: {
        textAlign: "left",
        padding: 10,
        direction: "ltr"
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
    sticky: {
        textAlign: "center",
        fontWeight: "bold",
        margin: "0px auto",
        position: "sticky",
        bottom: 42,
        backgroundColor: "whitesmoke",
        padding: "5px 0",
        display: "flex",
        justifyContent: "center",
        direction: "ltr",
        borderBottom: '1px solid rgba(0,0,0,0.1)'
    },
    textAlign: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0px 15px'
    },
    ml: {
        marginLeft: 5,
        direction: "rtl",
        display: "inline-block",
    },
    iconClose: {
        width: 20,
        height: 20,
        fill: 'red',
        marginLeft: 10,
    },
    iconcheck: {
        width: 25,
        height: 25,
        fill: 'green',
        marginLeft: 10,
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row-reverse'
    }

});

const stateSort = {
    DEFAULT: "DEFAULT",
    ASC: "asc",
    DESC: "desc"
}

let flagSwitch = false

export default React.memo(
    function SimpleTable({ data, apiSubmitSelect, apiSubmitRequest, sort, setSort, tableHead, setTableHead, pagination, setPagination, findStatus }) {

        const classes = useStyles();

        const [total, setTotal] = useState({
            total_positive: 0,
            total_negative: 0,
            total: 0,
        })

        const handleChangePagination = (event, value) => {
            setPagination(value);
        };


        const handleClickSort = (title, id) => {
            if (!title) {
                alert("امکان فیلتر این ستون وجود ندارد.")
                return
            }

            if (id === sort.id) {
                let findState = findStateSort(title)
                if (findState === stateSort.DEFAULT) {
                    setSort({})
                    return
                }
                setSort({ [title]: findState, id: id })
            } else {
                let res = tableHead.map(item => item.id === id ? { ...item, active: true } : { ...item, active: false })
                setTableHead(res)
                setSort({ [title]: stateSort.ASC, id: id })
            }
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

        useEffect(() => {
            if (flagSwitch) {
                apiSubmitSelect(pagination)
                apiSubmitRequest(pagination)
            }

            flagSwitch = true
        }, [pagination])


        const findBackgroundColor = (value, type) => {
            if (String(value) === '0')
                return { backgroundColor: 'rgba(0,0,0,0.1)' }
            return { backgroundColor: type.includes('REMOVE_') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,0,0.1)' }
        }

        useEffect(() => {
            if (data.data.length)
                resultAlldata()
        }, [data])


        const resultAlldata = () => {

            let array = [...data.data]

            let Positive = 0
            let negative = 0

            array.forEach((item => {
                let flag = item.body.bonus_type.includes('REMOVE_')
                if (flag)
                    negative += item.body.value
                if (!flag)
                    Positive += item.body.value
            }))
            setTotal(
                {
                    total_positive: Positive,
                    total_negative: negative,
                    total: Positive - negative,
                }
            )
        }

        return (
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table stickyHeader={true} className={classes.table} aria-label="simple table">
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
                        {
                            data.data.length !== 0 && (
                                data.data.map((row, ind) => (
                                    <TableRow
                                        key={ind}
                                        style={findBackgroundColor(row.body.value, row.body.bonus_type)}
                                    >
                                        <TableCell className="colorInherit" align="center">
                                            {
                                                pagination !== 1
                                                    ? pagination * data.size - data.size + (ind + 1)
                                                    : ind + 1
                                            }
                                        </TableCell>
                                        {/* <TableCell className="colorInherit" align="center">{row.body.member_reserved_bonus}</TableCell> */}
                                        <TableCell className="colorInherit" align="center">{row.body.member_id}</TableCell>
                                        <TableCell className="colorInherit" align="center">
                                            {seprateNumberFromComma(row.body.value)}
                                        </TableCell>
                                        <TableCell className="colorInherit" align="center">{row.body.create_date === "1970/01/01 00:00:00.000000" ? "" : dateMiladiToShamsi(row.body.create_date)}</TableCell>
                                        {/* <TableCell className="colorInherit" align="center">
                                            {
                                                row.body.closing_date === "1970/01/01 00:00:00.000000" ? "-" : row.body.closing_date ? (
                                                    dateMiladiToShamsi(row.body.closing_date)
                                                ) : "-"
                                            }
                                        </TableCell> */}

                                        <TableCell className="colorInherit" align="center">
                                            <p >
                                                {
                                                    row.body.status === "RESERVED"
                                                        ? (
                                                            <div className={classes['icon']}>
                                                                <svg className={classes['iconClose']}>
                                                                    <use xlinkHref="/sprite.svg#label"></use>
                                                                </svg>
                                                                <p>رزرو شده</p>
                                                            </div>
                                                        )
                                                        : row.body.status === "REJECTED"
                                                            ? (
                                                                <div className={classes['icon']}>
                                                                    <svg className={classes['iconClose']}>
                                                                        <use xlinkHref="/sprite.svg#close"></use>
                                                                    </svg>
                                                                    <p>لغو شده</p>
                                                                </div>
                                                            )
                                                            : row.body.status === "FINALIZED"
                                                                ? (
                                                                    <div className={classes['icon']}>
                                                                        <svg className={classes['iconcheck']}>
                                                                            <use xlinkHref="/sprite.svg#check"></use>
                                                                        </svg>
                                                                        <p>نهایی شده</p>

                                                                    </div>
                                                                )
                                                                : <p>نامشخص</p>

                                                }
                                                {/* {row.body.status === "RESERVED" ? "رزرو شده" : row.body.status === "REJECTED" ? "لغو شده" : row.body.status === "FINALIZED" ? "نهایی شده" : "نامشخص"} */}
                                            </p>

                                        </TableCell>
                                        <TableCell className="colorInherit" align="center">
                                            {findStatus(row.body.bonus_type)}
                                        </TableCell>
                                        <TableCell className="colorInherit" align="center">{row.body.source_description}</TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>

                {
                    data.data.length === 0 ? (
                        <CardNoData />
                    ) : (
                            <>
                                <div className={classes.sticky}>
                                    <div className={classes['textAlign']}>
                                        <p>مجموع:</p>
                                        <p className={classes['ml']}>{total.total}</p>
                                    </div>
                                    <div className={classes['textAlign']}>
                                        <p>اضافه شده:</p>
                                        <p className={classes['ml']}>{total.total_positive}</p>
                                    </div>
                                    <div className={classes['textAlign']}>
                                        <p>کسر شده:</p>
                                        <p className={classes['ml']}>{total.total_negative}</p>
                                    </div>
                                </div>
                                < p className={classes.stickyPagination}>
                                    <Pagination
                                        shape="rounded"
                                        variant="outlined"
                                        count={Math.ceil(data.total / data.size)}
                                        page={pagination}
                                        onChange={handleChangePagination}
                                    />
                                </p>

                            </>
                        )
                }

            </TableContainer>
        );
    }
)