import React, { useState } from 'react'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core'

import ModalEdite from '../ModalEdite';
import ModalImage from "../ModalImage";
import AlertDialogSlide from "./../../../../../Common/Components/AlertDialogSlide";
import AttachmentIcon from '@material-ui/icons/Attachment';


const useStles = makeStyles(() => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
    iconAttechment:{
            cursor:'pointer'
    }
}))

export default function Index({ info  , data  , handelSubmitUpdate , index , handelSubmitDelete}) {

    const [newButton, setNewButton] = useState(false);
    // const [newButton, setNewButton] = useState(false);
    const classes = useStles();

    const handleOkAlert = () => {
        // dispatch()
        handelSubmitDelete(index)
        setNewButton(false)
    }

    const Components = {
        ModalImage: <ModalImage setNewButton={setNewButton} data={data}/>,
        AlertDialogSlide :  <AlertDialogSlide
                                flagShow={setNewButton}
                                handleCloseAlert={setNewButton}
                                handleOkAlert={handleOkAlert}
                                data={dataAlertDialogSlide}
                            />,
        File : <AttachmentIcon onClick={() => { setNewButton(!newButton) }}  className={classes['iconAttechment']}/>,
        ModalEdite: <ModalEdite disable={()=>setNewButton(false)} data={data} handelSubmitUpdate={handelSubmitUpdate} index={index} />
    }

    const handleClickButton = (data) => {
        if (data === "NEW") {
            setNewButton(prev => !prev)
        }
        return
    }

    return (
        <>
            <>
                {
                    info.component &&(
                        <>
                        {Components[info.component]}
                        </>
                    )
                    
                }
            </>
            <>
                {
                    !info.component &&(
                        <>
                        <button className={info.className} onClick={() => { setNewButton(!newButton) }}>{info.title} </button>
                        </>
                    )
                    
                }
            </>
            {
                info.modal && (
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={newButton}
                        onClose={() => handleClickButton("NEW")}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}>

                        <Fade in={newButton}>
                            {Components[info.modal]}
                        </Fade>

                    </Modal>

                )
            }
        </>
    )
}

const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟",
}