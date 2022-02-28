import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TableBodyCustom from "./TableBody";
import ModalFAQ from '../modalFAQ';
import { useDispatch } from 'react-redux';
import { faq_v1_actions_delete } from "../../../../../boot/api/Definitions/faq/faq_v1_delete/action";
import AlertDialogSlide from "./../../../../Common/Components/AlertDialogSlide";



const useStyles = makeStyles((theme) => ({
    tableContainer: {
        height: "95%",
        direction: "rtl",
        borderRadius: 10
    },

    table: {
        minWidth: 650,
        direction: "ltr",
        borderRadius: 10
    },
    head: {
        fontWeight: "bold",
    },
    emptyFile: {
        textAlign: "left",
        padding: 10,
        direction: "ltr"
    },
    icons: {
        border: '1px solid rgba(0,0,0,0.1)',
        backgroundColor: 'white',
        padding: '5px 5px',
        position: 'relative',
        top: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        '& span': {
            padding: "0 5px",
            cursor: "pointer"
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 6, 3),
        minWidth: "931px",
        borderRadius: 10
    },
    textEditor: {
        width: "100%",
        height: "400px",
    },
    buttonsAdded: {
        float: "right"
    }
}))

export default function SimpleTable({ data, categotyFAQ }) {
    const [flagInsert, setFlagInsert] = useState(false);
    const [flagEdit, setFlagEdit] = useState(false);
    // const [mainGroup, setMainGroup] = React.useState('');
    const [selectedItem, setSelectedItem] = useState([false, null]);
    const [tableBodyData, setTableBody] = useState([]);
    const [ensureDelete, setEnsureDelete] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch()


    useEffect(() => {
        if (data) {
            let hanldeData = []
            hanldeData = data.map(item => {
                return { ...item.body, id: item.id }
            })

            setTableBody(hanldeData)
        }
    }, [data])


    const handleEditFaq = () => {
        if (!selectedItem[0]) {
            alert("گزینه ای انتخاب نکرده اید")
            return
        }
        setFlagEdit(true)
    }

    const handleDeleteFaq = () => {
        if (!selectedItem[0]) {
            alert("گزینه ای انتخاب نکرده اید")
            return
        }
  
        setEnsureDelete(true);
    }

    const handleOkAlert = () => {
        dispatch(faq_v1_actions_delete(selectedItem[1]))
        setEnsureDelete(false)
    }

    return (
        <>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table
                    stickyHeader
                    className={classes.table} aria-label="simple table" >
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
                            tableBodyData?.map((row, ind) => (
                                <TableBodyCustom
                                    selectedItem={selectedItem}
                                    changedSelected={setSelectedItem}
                                    data={row}
                                    key={ind}
                                    index={ind}
                                >
                                    {/* {data => handleSelectedTable(data)} */}
                                </ TableBodyCustom>
                            ))

                        }
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes['icons']}>
                <div style={{ paddingRight: 15 }}>
                    <span>
                        <AddBoxIcon onClick={() => setFlagInsert(true)} />
                    </span>
                    <span>
                        <CreateIcon onClick={() => handleEditFaq()} />
                    </span>
                    <span>
                        <DeleteForeverIcon onClick={handleDeleteFaq} />
                    </span>
                </div>
            </div>

            {/* ---------insert modal------ */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description11"
                    className={classes.modal}
                    open={flagInsert}
                    onClose={() => setFlagInsert(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={flagInsert}>
                        <ModalFAQ
                            categotyFAQ={categotyFAQ}
                            setflagClose={setFlagInsert}
                            type={"INSERT_REQUEST"}
                        />
                    </Fade>
                </Modal>
            </div>

            {/* ---------edit modal------ */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description11"
                    className={classes.modal}
                    open={flagEdit}
                    onClose={() => setFlagEdit(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={flagEdit}>
                        <ModalFAQ
                            categotyFAQ={categotyFAQ}
                            setflagClose={setFlagEdit}
                            type={"EDIT_REQUEST"}
                            data={tableBodyData}
                            selectedItem={selectedItem[1]}
                            flagEdit={flagEdit}
                        // dataEdit={testDataEdit}
                        />
                    </Fade>
                </Modal>
            </div>

            {/* ---------ensure delete------ */}
            <AlertDialogSlide
                flagShow={ensureDelete}
                handleCloseAlert={setEnsureDelete}
                handleOkAlert={handleOkAlert}
                data={dataAlertDialogSlide}
            />
        </>
    );
}

const tableHead = [
    'ردیف',
    'سوال',
    'جواب',
];

const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟",
}