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
       'نام اسلایدر ',
       'ارتفاع تصویر',
       'طول تصویر',
       'مقدار زمان نمایش',
       'مقدار زمان نمایش',
    ];
    

    const tablebody = [

        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },
        {nameSlider : 'نام اسلایدر' ,  lengthImg:'طول تصویر' , valueTimeShow:'مقدار زمان نمایش' },

    ];
    


    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
         

            <Table stickyHeader className={classes.table} aria-label="simple table" >
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
                                <TableCell className="colorInherit" align="center">{row.nameSlider}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.lengthImg}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.valueTimeShow}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.valueTimeShow}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.valueTimeShow}</TableCell>
                            </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        

        </TableContainer>
    );
}