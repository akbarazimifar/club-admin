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
        height: "80vh",
        direction: "rtl",
        borderRadius: 10,
        overflow: 'scroll',
        marginTop:20,
        margin:'auto',
        // maxHeight:400,
    },

    table: {
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
       'کد جایزه ',
       'عنوان جایزه',
       'درخواست کننده',
       'شماره تماس ',
       'کد ملی' ,      
    ];
    

    const tablebody = [

        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},
        {title : 'کارت هدیه یک ماهه نماوا' , name:'علی سلطانی' , tell:'09302525351' , ncode:'00137461588' , codeGift:'MSO24WQ2J59W8DBM898'},

    ];
    



    return (
        <TableContainer 
            className={classes.tableContainer}
            style={{height : flagFilter ? '50vh' :'81vh' , marginTop : 30}}
             component={Paper} >
         

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
                                <TableCell className="colorInherit" align="center">{row.codeGift}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.title}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.name}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.tell}</TableCell>
                                <TableCell className="colorInherit" align="center">{row.ncode}</TableCell>
           
                            </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        

        </TableContainer>
    );
}