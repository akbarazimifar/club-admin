import React, { useState } from 'react'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core';
import AlertDialogSlide from "./../../../../../Common/Components/AlertDialogSlide";
import AlertDialogSlideAvtivationRegistration from "./../../../../../Common/Components/AlertDialogSlide";
import { useDispatch } from 'react-redux';
import { registration_v1_actions_activation } from "./../../../../../../boot/api/Definitions/EducationCourses/registration_v1_activation/action";


// import ModalE from '../Modal';
import ModalEdit from "../ModalEdit";


const useStles = makeStyles(() => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
}))

export default function Index({ info , data , dataRow, apiCoursesUpdate , apiCoursesDeactive , apiCoursesActive }) {
    const [newButton, setNewButton] = useState(false);
    const classes = useStles();
    const dispatch = useDispatch()


    const handleOkAlertRegistration = () => {
        setNewButton(false)
        dispatch(registration_v1_actions_activation("unregister", dataRow.id))
    }

    const handelDelete = () => {

        if(data.body.is_active === 'TRUE')
             apiCoursesDeactive(data.id)

        if(data.body.is_active === 'FALSE')
        apiCoursesActive(data.id)  

        setNewButton(false)
    }

    const Components = {
        AlertDialogSlideAvtivationRegistration: <AlertDialogSlideAvtivationRegistration
        flagShow={newButton}
        handleCloseAlert={setNewButton}
        handleOkAlert={handleOkAlertRegistration}
        data={dataAlertDialogSlideRegistration}
    />,
        ModalEdit: <ModalEdit setNewButton={setNewButton} data = {data} apiCoursesUpdate={apiCoursesUpdate} />,
        modalDelete : <AlertDialogSlide
                flagShow={newButton}
                handleCloseAlert={setNewButton}
                handleOkAlert={() => handelDelete()}
                data={dataAlertDialogSlideRegistration}
      />
    }

    const handleClickButton = (data) => {
        if (data === "NEW") {
            setNewButton(prev => !prev)
        }
    }

    return (
        < >
            <button className={info.className} style={{marginTop:10}} onClick={() => { setNewButton(!newButton) }}>{info.title} </button>
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


const dataAlertDialogSlideRegistration = {
    title: "ویرایش",
    description: "از ویرایش این رکورد اطمینان دارید؟",
}