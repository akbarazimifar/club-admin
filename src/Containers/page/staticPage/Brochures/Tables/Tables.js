import React  , {useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Buttons from './Buttons';

const useStyles = makeStyles((theme) => ({
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
        minWidth: 600,
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
    modal: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: "white",
        width: 600,
        margin: "auto",
        padding: theme.spacing(5),
        '& div': {
            width: 250,
        }
    },
    btns: {
        margin: "40px 0 0 0",
        textAlign: "right",
        width: "100%",
    }
}));


export default function SimpleTable({Brochures_reducer , handelSubmitUpdate , handelSubmitDelete}) {

    const classes = useStyles();

    const [data , setDate] = useState([])

    useEffect(()=>{
        if(Brochures_reducer){      
            let res = JSON.parse(Brochures_reducer.response.data.results[0].body.content)
             setDate(res)

        }
    },[Brochures_reducer])
    
    return (
        <>
            <TableContainer
                className={classes.tableContainer}
                component={Paper}
                style={{ marginTop: 30, height: '80vh' }}>

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
                            data && (
                                data?.map((row, ind) => (
                                    <TableRow
                                         key={ind}
                                    // className={classes.tableRow}
                                    // onClick={handleClickRow}
                                    >
                                        <TableCell className="colorInherit" align="center">{ind + 1}</TableCell>
                                        <TableCell className="colorInherit" align="center">{row.title}</TableCell>
                                        <TableCell className="colorInherit" align="center"> {row.PdfUrl}</TableCell>
                                        <TableCell className="colorInherit" align="center">
                                            <Buttons
                                                    info={{
                                                        title: 'ویرایش',
                                                        className: 'btnsYellow',
                                                        modal: 'ModalImage',
                                                        component: 'File',
                                                    }}
                                                    data ={row}
                                                    index = {ind}
                                             />      
                                       </TableCell>
                                        <TableCell className="colorInherit" align="center">
                                            <Buttons
                                                info={{
                                                    title: 'ویرایش',
                                                    className: 'btnsYellow',
                                                    modal: 'ModalEdite',
                                                }}
                                                data = {row} 
                                                index = {ind}
                                                handelSubmitUpdate={handelSubmitUpdate}
                                                />
                                                
                                            <Buttons
                                                info={{
                                                    title: 'حذف',
                                                    className: 'btnsRed',
                                                    modal: 'AlertDialogSlide'
                                                }} 
                                                index = {ind}
                                                handelSubmitDelete = {handelSubmitDelete}
                                                />
                                        
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        </>
    );
}


const tableHead = [
    'ردیف',
    'عنوان بروشور',
    'لینک',
    'ضمائم',
    'ابزار',
]
