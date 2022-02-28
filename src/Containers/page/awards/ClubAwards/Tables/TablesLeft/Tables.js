import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles({
    tableContainer: {
        height: "85%",
        direction: "rtl",
        borderRadius: 10
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
    }
});


export default function SimpleTable() {

    const classes = useStyles();

    const tableHead = [
        'ردیف',
       'فعال ',
       'لینک صفحه',
       'نوع',
       'عنوان',
       'از تاریخ',
       'تا تاریخ',
    ];
    

    const tablebody = [

        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:true , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:false , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:true , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:false , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:true , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:false , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:true , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:false , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:true , title:'عنوان' },
        {link : 'http://test.com' , type:'نوع' , AzDate:'1399/08/22' , ToDate:'1399/09/10' , active:false , title:'عنوان' },


    ];
    


    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
         

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
                                 <TableCell  className="colorInherit" align="center">{ind+1}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.active}
                                <Checkbox
                                        defaultChecked =  {row.active}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </TableCell>
                                <TableCell className="colorInherit" align="center">{row.link}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.type}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.title}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.AzDate}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.ToDate}</TableCell>
           
                            </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        

        </TableContainer>
    );
}