import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';



const useStyles = makeStyles({
    tableContainer: {
        width:'96.5%',
        height: "100%",
        direction: "rtl",
        borderRadius: 10,
        maxHeight:'82.5vh',
        overflowY: 'scroll',
        marginTop: 20,
        margin:'auto',
      
    },

    table: {
        minWidth: 650,
        overflowY: 'scroll',
        direction: "ltr",
        borderRadius: 10,

    },
    head: {
        fontWeight: "bold"
    },
    emptyFile: {
        textAlign: "left",
        padding: 10,
        direction: "ltr"
    }
});


export default function SimpleTable({flagFilter}) {

    const classes = useStyles();
    const tableHead = [
        'ردیف',
       'تاریخ ارسال ',
       'فرستنده',
       'گروه موضوع',
       'موضوع ارسال',
       'نماد',
       'نام نماد',
       'تاریخ تایید',
       'تعداد لایک',
    ];
    

    const tablebody = [

        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},
        { date:'1399/08/22' , name:'سلطانی'  , title : 'موضوع' , titleRequest:'موضوع ارسال' , symbol:'نماد' , symbolName:'نام نماد' ,  dateLink:'1399/01/06' , counterLink:'1000'},

    ];
    


    return (
        <TableContainer 
            style={{height : flagFilter ? '57vh' :'98vh' , marginTop : 30}}
            className={classes.tableContainer} component={Paper} >
         

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
                <TableBody> 
                    {
                        tablebody && (
                            tablebody?.map((row, ind) => (
                                <TableRow
                                   key={ind}
                                // className={classes.tableRow}
                                // onClick={handleClickRow}
                            >
                                 <TableCell className="colorInherit" align="center">{ind+1}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.date}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.name}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.title}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.titleRequest}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.symbol}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.symbolName}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.dateLink}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.counterLink}</TableCell>
                            </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        

        </TableContainer>
    );
}