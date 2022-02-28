import React, { useState } from 'react'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core'

// import ModalE from '../Modal';
import ModalEdite from "./../../Tables/ModalEdite";
import AlertDialogSlide from '../../../../../Common/Components/AlertDialogSlide';


const useStles = makeStyles((them) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
}))

export default function Index({ info , data , index , handel_Submit_Edite , handel_Submit_Delete}) {

    const [newButton, setNewButton] = useState(false);
    const classes = useStles();
    const [flag , setFlag] = useState(false);

    const Components = {
        ModalEdite: <ModalEdite setNewButton={setNewButton} data={data} index={index} handel_Submit_Edite={handel_Submit_Edite}  />,
        // modalEdite : <ModalEdite disable={setNewButton} />
    }

    const handleClickButton = (data) => {
        if (data === "NEW") {
            setNewButton(prev => !prev)
        }
        return
    }

    const handelClick = (type)=>{

        if(type === 'حذف'){
            setFlag(true)
        }
        setNewButton(!newButton)
    }
    
    const handelDelete = (value , index )=>{
        handel_Submit_Delete(value , index)
        setFlag(false)
    }



    return (
        < >
            <button className={info.className} onClick={() => { handelClick(info.title) }}>{info.title} </button>
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
             {
                    flag&&(
                        <AlertDialogSlide
                            flagShow={setNewButton}
                            handleCloseAlert={()=>setFlag(false)}
                            handleOkAlert={()=>handelDelete(data,index , info.title)}
                            data={dataAlertDialogSlide}
                        />
                    )
                }
        </>
    )
}


const dataAlertDialogSlide = {
    title: "حذف",
    description: "از حذف این رکورد اطمینان دارید؟",
}