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
        width:'96%',
        margin:'auto',
        height: "100%",
        direction: "rtl",
        borderRadius: 10,
        overflowY: 'scroll',
        maxHeight:530,
        marginTop:30,
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
       'نام ',
       'نام خانوادگی',
       'سن',
       'تلفن',
    ];
    
    const tablebody = [

        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
        {name : 'علی' , family:'سلطانی' , age:'28' , tell:'09302525351'},
    ];
    


    return (
        <TableContainer
        style={{height :flagFilter ? '50vh' : '49vh'}}
        className={classes.tableContainer} component={Paper}>
         

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
                                <TableCell className="colorInherit" align="center">{row.name}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.family}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.age}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.tell}</TableCell>
           
                            </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        

        </TableContainer>
    );
}