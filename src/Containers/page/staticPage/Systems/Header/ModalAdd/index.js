import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { systems_v1_update_actions } from "./../../../../../../boot/api/staticPage/systems/systems_v1_update/action";


const useStyles = makeStyles((theme) => ({
    ModalAdd: {
        width: 600,
        borderRadius: 8,
        padding: 15,
        backgroundColor: "whitesmoke",
    },
    root: {
        padding: "20px 0",

        width: "90%",
        margin: "auto",
        '& .MuiBox-root': {
            margin: theme.spacing(1),

        },
    },
    btns: {
        margin: "0px 0 10px 0",
        textAlign: "right",
        width: "95%",
    }
}));

export default function Index({ setNewButton, dataPrev, data }) {
    const classes = useStyles();
    const [title, setTitle] = useState(data ? data.Title : "")
    const [link, setLink] = useState(data ? data.Url : "")
    const dispatch = useDispatch()

    const handleSubmitUpdate = () => {
        if (!title || !link) {
            alert("عنوان یا لینک را پر نکرده اید");
            return
        }

        let parsDataPrev = JSON.parse(dataPrev[0].body.content)
        let dataNew = { Title:title, Url:link }
        let setDataInsert = [dataNew , ...parsDataPrev]

        let id = dataPrev[0].id

        if (data) {
            let dataUpdate = parsDataPrev.map(item => {
                if (item.Title === data.Title && item.Url === data.Url) {
                    return { Title:title, Url:link }
                }
                return item
            })
            dispatch(systems_v1_update_actions(JSON.stringify(dataUpdate), id))
        } else {
            dispatch(systems_v1_update_actions(JSON.stringify(setDataInsert), id))
        }

        setNewButton(false)
    }

    return (
        <div className={classes['ModalAdd']}>

            <div className={classes['root']}>
                <div>

                    <Box
                        width="50%"
                    >
                        <TextField
                            label="عنوان"
                            id="titleNewButton"
                            value={title}
                            onChange={(event) => {
                                let { value } = event.target
                                setTitle(value)
                            }}
                            variant="outlined"
                            size="small"
                            fullWidth
                            margin="dense"
                        />

                    </Box>

                    <Box
                        width="100%"
                    >
                        <TextField
                            label="لینک"
                            id="titleNewButton1"
                            value={link}
                            onChange={(event) => {
                                let { value } = event.target
                                setLink(value)
                            }} variant="outlined"
                            size="small"
                            fullWidth
                            margin="dense"
                        />

                    </Box>

                </div>

            </div>

            <div className={classes['btns']}>
                <button
                    className={'btnsGreen'}
                    onClick={handleSubmitUpdate}
                >ذخیره </button>
                <button
                    className={'btnsRed'}
                    onClick={() => setNewButton(false)}
                >انصراف </button>
            </div>
        </div>
    )
}
