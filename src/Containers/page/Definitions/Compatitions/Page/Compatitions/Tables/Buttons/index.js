import React, { useState } from 'react'
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core'
import InsertModal from './../../../../Header/insertModal';
import EditModal from './../../../Compatitions/editModal';
import EditResponseModal from "./../../../Compatitions/Tables/editResponseModal";
import { compatition_v1_actions_insert } from "./../../../../../../../../boot/api/Definitions/Compatitions/compatition_v1_insert/action";
import { compatition_v1_actions_update } from "./../../../../../../../../boot/api/Definitions/Compatitions/competition_v1_update/action";
import { compatition_v1_actions_update_competition_answer } from "./../../../../../../../../boot/api/Definitions/Compatitions/competition_v1_update_competition_answer/action";
import { useDispatch } from 'react-redux';


const useStles = makeStyles(() => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
    },
}))

export default function Index({ info, handleChangeRoute }) {

    const [newButton, setNewButton] = useState(false);
    const classes = useStles();
    const dispatch = useDispatch()


    ////////////////////////////////submit Insert Competition//////////////////////
    const submitInsertCompetition = (data) => {
        dispatch(compatition_v1_actions_insert(data))
    }
    //////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////submit update Competition//////////////////////
    const submitUpdateCompetition = (data) => {
        dispatch(compatition_v1_actions_update(data))
    }
    //////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////submit update_competition_answer//////////////////////
    const submit_update_competition_answer = (data) => {
        dispatch(compatition_v1_actions_update_competition_answer(data))
    }
    //////////////////////////////////////////////////////////////////////////////////


    const Components = {
        insertModal: <InsertModal disable={setNewButton} submitInsertCompetition={submitInsertCompetition} />,
        EditModal: <EditModal data={info.data} disable={setNewButton} submitUpdateCompetition={submitUpdateCompetition} />,
        editResponseModal: <EditResponseModal data={info.data} disable={setNewButton} submit_update_competition_answer={submit_update_competition_answer} />
    }



    const handleClickButton = (data) => {
        if (data === "NEW") {
            setNewButton(prev => !prev)
        }
    }

    const handleClick = () => {
        if (info.flagTypePage === "compatitions") {
            setNewButton(!newButton)
            return
        }

        if (info.flagTypePage === "statistics" || info.flagTypePage === "Separation") {
            handleChangeRoute(info.modal)
            return
        }
    }

    return (
        < >
            <button className={info.className} onClick={handleClick}> {info.title} </button>

            {
                info.flagTypePage === "compatitions" && (
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
